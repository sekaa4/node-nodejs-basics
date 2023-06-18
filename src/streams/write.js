import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './files/fileToWrite.txt');

const write = async () => {
  const { stdin } = process;
  const output = createWriteStream(filePath, { flags: 'a' });

  stdin.on('data', (chunk) => {
    output.write(chunk);
  });
};

await write();
