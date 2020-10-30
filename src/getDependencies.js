function getDependencies(content) {
  const reg = /require\(['"](.+?)['"]/g;
  let result = null;
  const mapping = [];
  while ((result = reg.exec(content))) {
    mapping.push(result[1]);
  }
  return mapping;
}

module.exports = { getDependencies };
