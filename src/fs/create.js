import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fresh.txt');

const create = async () => {
  try {
    await writeFile(path, 'I am fresh and young', { flag: 'wx' });
  } catch (err) {
    if (err.code === 'EEXIST') {
      err.message = 'FS operation failed';
      console.log('Error:', err.message);
    } else throw err;
  }
};

await create();
