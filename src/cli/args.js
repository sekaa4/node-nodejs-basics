const parseArgs = () => {
  const prefix = '--';

  const args = process.argv.slice(2);
  const separatedArgs = args.reduce((acc, cur, curInx) => {
    if (cur.indexOf(prefix) === 0) {
      acc.push(`${cur.slice(2)} is ${args[curInx + 1]}`);
      return acc;
    }
    return acc;
  }, []);

  console.log(separatedArgs.join(', '));
};

parseArgs();
