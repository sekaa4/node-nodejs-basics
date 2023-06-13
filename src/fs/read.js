import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const read = async () => {
  try {
    const readFilePath = resolve(path, 'fileToRead.txt');
    const contents = await readFile(readFilePath, { encoding: 'utf8' });

    console.log(contents);
  } catch (err) {
    if (err.syscall === 'open') {
      err.message = 'FS operation failed';
      console.log('Error:', err.message);
    } else throw err;
  }
};

await read();
