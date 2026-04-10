// Validation script to check contact form setup
// Run with: node validate-setup.js

import fs from 'fs';
import path from 'path';

console.log('🔍 Validating contact form setup...\n');

// Check if required files exist
const requiredFiles = [
  '.github/workflows/contact-form.yml',
  'netlify/functions/contact/contact.js',
  'netlify.toml',
  '.env.example',
  'src/App.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json for netlify-build script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.scripts && packageJson.scripts['netlify-build']) {
  console.log('✅ package.json has netlify-build script');
} else {
  console.log('❌ package.json missing netlify-build script');
  allFilesExist = false;
}

// Check App.tsx for contact form implementation
const appContent = fs.readFileSync('src/App.tsx', 'utf8');
if (appContent.includes('fetch') && appContent.includes('/.netlify/functions/contact')) {
  console.log('✅ App.tsx has contact form implementation');
} else {
  console.log('❌ App.tsx missing contact form implementation');
  allFilesExist = false;
}

console.log('\n📋 Setup Summary:');
if (allFilesExist) {
  console.log('✅ All required files are present');
  console.log('\n🚀 Next steps:');
  console.log('1. Set up GitHub Secrets (GH_TOKEN, etc.)');
  console.log('2. Deploy to Netlify');
  console.log('3. Configure environment variables in Netlify');
  console.log('4. Test the contact form');
} else {
  console.log('❌ Some files are missing or incomplete');
  console.log('\n💡 Run the setup steps in SETUP-GUIDE.md');
}

console.log('\n📖 See SETUP-GUIDE.md for detailed instructions');