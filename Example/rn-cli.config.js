const path = require('path');

// See https://github.com/facebook/metro-bundler/issues/68
const extraNodeModulesGetter = {
  get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
};

module.exports = {
  extraNodeModules: new Proxy({}, extraNodeModulesGetter),
};
