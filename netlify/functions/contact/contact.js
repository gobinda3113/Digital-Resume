// Netlify function to handle contact form submissions securely
// This function will forward the message to GitHub Issues via GitHub Actions workflow

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const { name, email, subject, message, timestamp } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: name, email, message' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Forward the request to GitHub Actions workflow
    // This will trigger the GitHub Actions workflow that creates an issue
    const githubResponse = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'contact_form_submission',
        client_payload: {
          name,
          email,
          subject: subject || 'No subject',
          message,
          timestamp
        }
      })
    });

    if (!githubResponse.ok) {
      console.error('GitHub API error:', await githubResponse.text());
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process contact form submission' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact form submitted successfully' })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};