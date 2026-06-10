// Netlify Function: netlify/functions/send-sms.js
// Proxies SMS requests to Textbelt server-side (avoids browser CORS block)
const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Invalid JSON' }) }; }

  const { phone, message, key } = body;
  if (!phone || !message) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing phone or message' }) };
  }

  const params = new URLSearchParams({ phone, message, key: key || 'textbelt' }).toString();

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'textbelt.com',
      path: '/text',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: data
        });
      });
    });
    req.on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ success: false, error: e.message }) });
    });
    req.write(params);
    req.end();
  });
};
