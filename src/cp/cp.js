import { fork } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = resolve(__dirname, './files/script.js');

const spawnChildProcess = async (args) => {
  const ls = fork(scriptPath, args, { stdio: 'pipe' });

  process.stdin.pipe(ls.stdin);
  ls.stdout?.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2']);
