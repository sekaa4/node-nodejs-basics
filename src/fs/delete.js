import { rm, } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const remove = async () => {
  try {
    const deleteFilePath = resolve(path, 'fileToRemove.txt');

    await rm(deleteFilePath);
  } catch (err) {
    if (err.syscall === 'lstat') {
      throw new Error('FS operation failed');
    } else throw err;
  }
};

await remove();
