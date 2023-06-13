import { existsSync, } from 'node:fs';
import { rename as renameFile, } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const rename = async () => {
  try {
    const wrongFilePath = resolve(path, 'wrongFilename.txt');
    const renameFilePath = resolve(path, 'properFilename.md');
    const isWrongFileExist = existsSync(wrongFilePath);
    const isRenameFileExist = existsSync(renameFilePath);

    if (!isWrongFileExist || isRenameFileExist) {
      throw new Error('FS operation failed');
    }

    await renameFile(wrongFilePath, renameFilePath);
  } catch (err) {
    console.log('Error:', err.message);
  }
};

await rename();
