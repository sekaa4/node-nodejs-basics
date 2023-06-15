import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './fileToCompress.txt');
const archivePath = resolve(__dirname, './archive.gz');

const decompress = async () => {
  const input = createReadStream(archivePath);
  const output = createWriteStream(filePath);
  const gunzip = createGunzip();

  pipeline(input, gunzip, output, (err) => {
    if (err) console.log(err);
  });
};

await decompress();
