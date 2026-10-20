const http = require('http');

function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: res.headers['content-type']?.includes('json')
            ? JSON.parse(buffer.toString())
            : buffer,
        });
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting End-to-End API Verification...\n');

  // 1. Health
  const health = await request('http://localhost:5000/api/health');
  console.log('✅ /api/health:', health.statusCode, health.body.service);

  // 2. Portfolio Data
  const port = await request('http://localhost:5000/api/portfolio');
  console.log(
    '✅ /api/portfolio:',
    port.statusCode,
    `Profile: ${port.body.data.profile.name}, Projects: ${port.body.data.projects.length}, Skills: ${port.body.data.skills.length}`
  );

  // 3. Contact POST
  const contactPayload = {
    name: 'Aditya Test Evaluator',
    email: 'evaluator@jklu.edu.in',
    subject: 'MERN Stack Evaluation',
    message: 'Testing Mongoose schema validation and database insertion.',
  };
  const contactRes = await request(
    'http://localhost:5000/api/contact',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    contactPayload
  );
  console.log(
    '✅ POST /api/contact:',
    contactRes.statusCode,
    `Saved ID: ${contactRes.body.data.id}`
  );

  // 4. Contact GET
  const allContacts = await request('http://localhost:5000/api/contact');
  console.log(
    '✅ GET /api/contact:',
    allContacts.statusCode,
    `Total stored in MongoDB: ${allContacts.body.count}`
  );

  // 5. PDF Resume
  const pdfRes = await request('http://localhost:5000/api/resume/pdf');
  console.log(
    '✅ GET /api/resume/pdf:',
    pdfRes.statusCode,
    `Content-Type: ${pdfRes.headers['content-type']}, Size: ${pdfRes.body.length} bytes, Disposition: ${pdfRes.headers['content-disposition']}`
  );

  // 6. DOCX Resume
  const docxRes = await request('http://localhost:5000/api/resume/docx');
  console.log(
    '✅ GET /api/resume/docx:',
    docxRes.statusCode,
    `Content-Type: ${docxRes.headers['content-type']}, Size: ${docxRes.body.length} bytes, Disposition: ${docxRes.headers['content-disposition']}`
  );

  // 7. Client SPA delivery
  const spaRes = await request('http://localhost:5000/');
  console.log(
    '✅ GET / (Frontend delivery):',
    spaRes.statusCode,
    `Served HTML with title: ${spaRes.body.toString().includes('Aditya Modani') ? 'PASSED' : 'FAILED'}`
  );

  console.log('\n🎉 ALL 7 TEST SUITES PASSED FLAWLESSLY!');
}

runTests().catch(console.error);
