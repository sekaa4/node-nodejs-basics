import { rename as renameFile, access, constants } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');

const rename = async () => {
  try {
    const wrongFilePath = resolve(path, 'wrongFilename.txt');
    const renameFilePath = resolve(path, 'properFilename.md');
    const isWrongFileExist = await access(wrongFilePath, constants.F_OK).then(() => true).catch(() => false);
    const isRenameFileExist = await access(renameFilePath, constants.F_OK).then(() => true).catch(() => false);

    if (!isWrongFileExist || isRenameFileExist) {
      throw new Error('FS operation failed');
    }

    await renameFile(wrongFilePath, renameFilePath);
  } catch (err) {
    throw err;
  }
};

await rename();
