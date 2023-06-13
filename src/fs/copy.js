import { constants, opendir, copyFile, mkdir } from 'node:fs/promises';
import { existsSync, } from 'node:fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');
let pathCopy = resolve(__dirname, 'files_copy');

const openDir = async (pathDir, pathCopy) => {
  const dir = await opendir(pathDir);

  for await (const dirent of dir) {
    const isFile = dirent.isFile();
    if (isFile) {
      await copyFile(resolve(dir.path, dirent.name), resolve(pathCopy, dirent.name), constants.COPYFILE_EXCL);
    } else {
      const newPathCopy = resolve(pathCopy, dirent.name);
      await mkdir(newPathCopy);
      await openDir(resolve(dir.path, dirent.name), newPathCopy);
    }
  }
};

const copy = async () => {
  const isExistDir = existsSync(path);
  const isExistDirCopy = existsSync(pathCopy);

  try {
    if (!isExistDir || isExistDirCopy) {
      throw new Error('FS operation failed');
    }
    await mkdir(pathCopy);
    await openDir(path, pathCopy);
  } catch (err) {
    console.log('Error:', err.message);
  }


};

await copy();
