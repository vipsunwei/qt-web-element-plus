const files = require.context(".", false, /.mp3$/);

const steps = files.keys().reduce((obj, path) => {
  const name = path.replace(/^\.\/步序改变维(.*)\.mp3/, "$1");
  obj[name] = files(path);
  return obj;
}, {});

export default steps;
