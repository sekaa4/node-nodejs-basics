import { Transform } from 'stream';

const transform = async () => {
  const { stdin, stdout } = process;
  const transform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split('').reverse().join(''));
      callback();
    }
  });

  stdin.pipe(transform).pipe(stdout);
};

await transform();
