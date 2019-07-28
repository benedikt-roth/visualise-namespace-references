const glob = require('glob');

const getFileList = async (pattern) =>
  new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      if (err) {
        reject(err);
      }

      resolve(matches);
    });
  });

module.exports = {
  getFileList,
}