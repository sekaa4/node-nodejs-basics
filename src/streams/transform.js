import { Transform } from 'stream';
import { EOL } from 'node:os';

const transform = async () => {
  const { stdin, stdout } = process;
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join('') + EOL);
      callback();
    }
  });

  stdin.pipe(transform).pipe(stdout);
};

await transform();
