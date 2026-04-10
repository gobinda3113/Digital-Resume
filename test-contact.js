// Simple test script to verify contact form functionality
// Run with: node test-contact.js

const fetch = require('node-fetch');

async function testContactForm() {
  console.log('Testing contact form submission...');
  
  try {
    const response = await fetch('http://localhost:8888/.netlify/functions/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Message',
        message: 'This is a test message from the contact form.',
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Contact form test passed!');
    } else {
      console.log('❌ Contact form test failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    console.log('Make sure Netlify Dev is running: npx netlify dev');
  }
}

testContactForm();