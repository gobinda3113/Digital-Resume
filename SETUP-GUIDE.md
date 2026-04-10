# Contact Form Setup Guide

This guide will help you set up the secure contact form system for your portfolio website.

## 🛠️ Prerequisites

- GitHub account
- Netlify account (free)
- Gmail account (optional, for email notifications)

## 📋 Step-by-Step Setup

### 1. GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with the following permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
3. Copy the token - you'll need it later

### 2. GitHub Repository Secrets

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `GH_TOKEN`: Your GitHub Personal Access Token
   - `EMAIL_USER` (optional): Your Gmail address
   - `EMAIL_PASSWORD` (optional): Gmail app password
   - `NOTIFICATION_EMAIL` (optional): Email to receive notifications

### 3. Netlify Deployment

1. Sign in to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `dist`
5. Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add:
     - `GITHUB_REPO`: `your-username/your-repo-name`
     - `GITHUB_TOKEN`: Your GitHub Personal Access Token

### 4. Gmail App Password (Optional)

If you want email notifications:

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Use this password for `EMAIL_PASSWORD` secret

## 🔧 Testing the Contact Form

### Local Testing

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Start local development server:
   ```bash
   npx netlify dev
   ```

3. Test the contact form:
   ```bash
   node test-contact.js
   ```

### Production Testing

1. Deploy to Netlify
2. Fill out the contact form on your live website
3. Check:
   - GitHub Issues tab for new contact form submissions
   - Email inbox for notifications (if configured)

## 🔒 Security Notes

- ✅ No API tokens in frontend code
- ✅ All sensitive data in environment variables
- ✅ Server-side validation
- ✅ GitHub Issues for organized management
- ✅ Optional email notifications

## 🚨 Troubleshooting

### Common Issues

1. **Form submission fails**: Check Netlify function logs
2. **GitHub issue not created**: Verify GH_TOKEN has correct permissions
3. **Email not sent**: Check Gmail app password configuration

### Logs

- Netlify function logs: Netlify dashboard → Functions
- GitHub Actions logs: GitHub repository → Actions

## 📞 Support

If you encounter issues:

1. Check the logs mentioned above
2. Verify all environment variables are set correctly
3. Ensure GitHub token has required permissions

---

Your secure contact form is now ready! 🎉