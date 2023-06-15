import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, './files/fileToCalculateHashFor.txt');

const calculateHash = async () => {
  try {
    const contextFile = await readFile(filePath, { encoding: 'utf8' });
    const hashSum = createHash('sha256');
    hashSum.update(contextFile);
    console.log(hashSum.digest('hex'));
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
