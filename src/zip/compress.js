import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './files/fileToCompress.txt');
const archivePath = resolve(__dirname, './files/archive.gz');

const compress = async () => {
  try {
    const input = createReadStream(filePath);
    const output = createWriteStream(archivePath);
    const gzip = createGzip();

    await pipeline(input, gzip, output);
  } catch (error) {
    throw error;
  }
};

await compress();
