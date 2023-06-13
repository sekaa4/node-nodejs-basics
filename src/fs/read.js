import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const read = async () => {
  try {
    const readFilePath = resolve(path, 'fileToRead.txt');
    const isFileExist = existsSync(readFilePath);

    if (!isFileExist) {
      throw new Error('FS operation failed');
    }

    const contents = await readFile(readFilePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.log('Error:', err.message);
  }
};

await read();
