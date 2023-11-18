import fs from 'fs';
import path from 'path';

const folderName = process.argv[2];

if (!folderName) {
  console.error('Please provide a folder name as a command line argument');
  process.exit(1);
}

const folderPath = path.join(__dirname, 'src', folderName);

// Create the folder
fs.mkdirSync(folderPath);

// Create the CSS file
const cssFilePath = path.join(folderPath, `${folderName}.css`);
fs.writeFileSync(cssFilePath, '');

// Create the JavaScript file
const jsFilePath = path.join(folderPath, `${folderName}.js`);
fs.writeFileSync(jsFilePath, '');

// Create the index.html file
const htmlFilePath = path.join(folderPath, 'index.html');
fs.writeFileSync(htmlFilePath, '');

console.log(`Folder '${folderName}' created with CSS, JavaScript, and HTML files`);


