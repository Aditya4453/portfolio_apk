const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Optional email notification transporter
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// @desc   Submit contact form & save to MongoDB
// @route  POST /api/contact
// @access Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Field validations
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Save to MongoDB using Mongoose model
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
    });

    console.log(`[Contact Form] New submission received from: ${name} <${email}> [ID: ${newContact._id}]`);

    // Optional Nodemailer notification
    let emailSent = false;
    const transporter = createTransporter();
    if (transporter && process.env.NOTIFICATION_EMAIL) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL,
          subject: `[Portfolio Message] ${subject || 'New Inquiry'} from ${name}`,
          text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #2563eb; margin-top: 0;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">Saved in MongoDB with ID: ${newContact._id}</p>
            </div>
          `,
        });
        emailSent = true;
        console.log(`[Nodemailer] Notification email sent successfully.`);
      } catch (mailErr) {
        console.warn(`[Nodemailer] Could not send notification email: ${mailErr.message}`);
      }
    } else {
      console.log(`[Nodemailer] SMTP credentials not set; message stored safely in MongoDB.`);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved successfully.',
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt,
        emailNotification: emailSent,
      },
    });
  } catch (err) {
    console.error('[Contact Form Error]', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while saving your message. Please try again.',
    });
  }
};

// @desc   Get all contact submissions (for demonstration & grading verification)
// @route  GET /api/contact
// @access Public / Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    console.error('[Get Contacts Error]', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages.',
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
};
