const parseEnv = () => {
  const prefix = 'RSS_';
  const keysEnv = Object.keys(process.env);

  const arrPrefixEnv = keysEnv.reduce((acc, cur) => {
    if (cur.indexOf(prefix) === 0) {
      const str = `${cur}=${process.env[cur]}`;
      acc.push(str);
      return acc;
    }
    return acc;
  }, []);

  const result = arrPrefixEnv.join('; ');

  console.log(result);
};

parseEnv();
