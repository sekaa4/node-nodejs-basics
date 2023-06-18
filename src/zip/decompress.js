import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './fileToCompress.txt');
const archivePath = resolve(__dirname, './files/archive.gz');

const decompress = async () => {
  try {
    const input = createReadStream(archivePath);
    const output = createWriteStream(filePath);
    const gunzip = createGunzip();

    pipeline(input, gunzip, output);
  } catch (error) {
    throw error;
  }
};

await decompress();
