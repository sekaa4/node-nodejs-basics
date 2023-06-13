import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const list = async () => {
  try {
    const isFolderExist = existsSync(path);

    if (!isFolderExist) {
      throw new Error('FS operation failed');
    }

    const array = await readdir(path);
    console.log(array);
  } catch (err) {
    console.log('Error:', err.message);
  }
};

await list();
