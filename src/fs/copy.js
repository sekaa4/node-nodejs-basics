import { constants, opendir, copyFile, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files');
let pathCopy = resolve(__dirname, 'files_copy');

const openDir = async (pathDir, pathCopy) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

const copy = async () => {
  try {
    const isExistDir = await access(path, constants.F_OK).then(() => true).catch(() => false);
    const isExistDirCopy = await access(pathCopy, constants.F_OK).then(() => true).catch(() => false);
    if (!isExistDir || isExistDirCopy) {
      throw new Error('FS operation failed');
    }
    await mkdir(pathCopy);
    await openDir(path, pathCopy);
  } catch (err) {
    throw err;
  }
};

await copy();
