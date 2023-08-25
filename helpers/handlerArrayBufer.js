const fs = require('fs').promises;

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i + 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function readFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath);
    return new Uint8Array(fileContent).buffer;
  } catch (error) {
    throw new Error(`Could not read the file: ${error.message}`);
  }
}

module.exports = { arrayBufferToBase64, readFile };
