const ts = require('typescript');
const fs = require('fs');

const load = (fileName) => ts.createSourceFile(
    fileName,
    fs.readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    true
  );

module.exports = {
  load,
};
