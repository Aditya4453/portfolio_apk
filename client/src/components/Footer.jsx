import React from 'react';
import ShutterGlyphFooter from './ShutterGlyphFooter';

export default function Footer({ profile }) {
  return (
    <ShutterGlyphFooter
      brand="Aditya"
      wordmark="ADITYA"
      shutterAt={4}
      company="Aditya Modani · Developer & Creative Technologist"
      since={2026}
      background="#000000"
      ink="#f4f4f0"
      
      socials={[
        { label: "GitHub", href: profile?.github || "https://github.com/Aditya4453" },
        { label: "LinkedIn", href: profile?.linkedin || "https://linkedin.com/in/aditya-modani" },
        { label: "YouTube", href: profile?.youtube || "https://youtube.com" },
      ]}
      legal={[
        
        { label: "Jaipur, India" }
      ]}
      onSubscribe={async (email) => {
        // Send to the Express backend contact endpoint
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'Newsletter Signup',
              email: email,
              subject: 'Newsletter Subscription',
              message: `New newsletter signup from: ${email}`,
            }),
          });
          const data = await res.json();
          return data.success;
        } catch {
          return false;
        }
      }}
      onLinkClick={(label, href) => {
        console.log('Footer link clicked:', label, href);
      }}
    />
  );
}
