import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const list = async () => {
  try {
    const array = await readdir(path);

    console.log(array);
  } catch (err) {
    if (err.syscall === 'scandir') {
      throw new Error('FS operation failed');
    } else throw err;
  }
};

await list();
