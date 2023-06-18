import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './files/fileToRead.txt');

const read = async () => {
  const { stdout } = process;
  let content = '';
  const input = createReadStream(filePath, 'utf-8');

  input.on('data', (chunk) => {
    content += chunk;
  });
  input.on('end', () => {
    stdout.write(content);
  });
};

await read();
