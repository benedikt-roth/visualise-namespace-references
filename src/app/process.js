const process = require('process');
const fileUtils = require('../lib/file-utils');
const tsLoader = require('../lib/typescript/loader');
const tsAnalyser = require('../lib/typescript/analyser');

function getArgumentValue(argName) {
  const argIndex = process.argv.indexOf(`--${argName}`);

  if (argIndex === -1) {
    console.error(`Parameter "--${argName}" not specified!`);
    process.exit(1);
  }

  const argValueIndex = argIndex + 1;

  if (process.argv.length < argValueIndex + 1) {
    console.error(`Parameter value for "${argName}" not specified!`);
    process.exit(1);
  }

  return process.argv[argIndex+1]
}

const run = async() => {
  const filePattern = getArgumentValue('include');
  const fileList = await fileUtils.getFileList(filePattern);
  
  if (fileList.length === 0) {
    console.error(`0 files were found.`);
    exit(0);
  }

  console.log(`Running analysis...`);

  const results = fileList.map(fileName => ({
      fileName,
      namespaceReferences: tsAnalyser.getNamespaceReferenceCount(tsLoader.load(fileName))
    }));

  console.log(results);


  /**
   * - get a list of typescript files
   * - for file in fileList
   *   - importIdentifiers = list of all imports
   *   - for node in nodes (where type is PropertyAccessExpression or TypeReference)
   *     - if NOT identifier part of importIdentifiers
   *       - file.namespaceReferenceCount++
   */

  console.log(`Analysis done.`);
  process.exit(0);
};

module.exports = {run};
