import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './files/fileToCompress.txt');
const archivePath = resolve(__dirname, './archive.gz');

const compress = async () => {
  const input = createReadStream(filePath);
  const output = createWriteStream(archivePath);
  const gzip = createGzip();

  pipeline(input, gzip, output, (err) => {
    if (err) console.log(err);
  });
};

await compress();
