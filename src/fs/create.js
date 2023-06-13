import { writeFile, access, constants } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = resolve(__dirname, 'files', 'fresh.txt');

const create = async () => {
  /**
   * @type {boolean}
   */
  let isExist = false;

  try {
    await access(path, constants.F_OK);
    isExist = true;

    throw new Error('FS operation failed');
  } catch (err) {
    if (!isExist) {
      await writeFile(path, 'I am fresh and young');
      return;
    }
    console.log('Error:', err.message);
  }
};

await create();
