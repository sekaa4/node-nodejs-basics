import { existsSync, } from 'node:fs';
import { rm, } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const remove = async () => {
  try {
    const deleteFilePath = resolve(path, 'fileToRemove.txt');
    const isDeleteFileExist = existsSync(deleteFilePath);

    if (!isDeleteFileExist) {
      throw new Error('FS operation failed');
    }

    await rm(deleteFilePath);
  } catch (err) {
    console.log('Error:', err.message);
  }
};

await remove();
