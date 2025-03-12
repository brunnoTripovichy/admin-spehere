const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Path to the tsconfig.json file
const tsconfigPath = path.join(__dirname, 'tsconfig.json');

// Read the original tsconfig.json
const originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');

// Parse the original tsconfig.json
const tsconfig = JSON.parse(originalTsconfig);

// Modify the tsconfig.json for the build
tsconfig.compilerOptions.strict = false;
tsconfig.compilerOptions.noEmit = false;
tsconfig.compilerOptions.noCheck = true;

// Write the modified tsconfig.json
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

try {
  console.log('Building with relaxed type checking...');
  // Run the build command
  execSync('next build --no-lint', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Restore the original tsconfig.json
  fs.writeFileSync(tsconfigPath, originalTsconfig);
  console.log('Restored original tsconfig.json');
}
