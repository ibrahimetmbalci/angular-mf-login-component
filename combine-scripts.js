const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist/angular-login-component/browser');
const outputPath = path.join(__dirname, 'dist');

// Read all JS files
const polyfillsContent = fs.readFileSync(path.join(distPath, 'polyfills.js'), 'utf8');
const mainContent = fs.readFileSync(path.join(distPath, 'main.js'), 'utf8');

// Combine them
const combinedContent = `${polyfillsContent}\n${mainContent}`;

// Write combined file
fs.writeFileSync(path.join(outputPath, 'angular-login-component.js'), combinedContent);

console.log('Combined Angular web component created at dist/angular-login-component.js');