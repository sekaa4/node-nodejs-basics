import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = resolve(__dirname, './worker.js');
const startNumber = 10;

const performCalculations = async () => {
  const cpuCount = cpus().length;

  const runService = (number) => {
    const arrPromises = [];
    for (let i = 0; i < cpuCount; i += 1) {
      const workerData = number + i;
      arrPromises[i] = new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData });
        worker.on('message', (value) => resolve({ status: 'resolve', data: value }));
        worker.on('error', () => resolve({ status: 'error', data: null }));
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`stopped with ${code} exit code`));
          }
        });
      });
    }
    return arrPromises;
  };

  const run = async () => {
    const result = await Promise.all(runService(startNumber));
    console.log(result);
  };

  run().catch((err) => console.error(err));
};

await performCalculations();
