const fs = require("fs");
const path = require("path");

const pathToModules = path.join(__dirname, "src");

const modules = fs.readdirSync(pathToModules).reduce((res, module) => {
  const propertyName = module.replace(".json", "");
  const pathToModule = `${pathToModules}/${module}`;
  res[propertyName] = require(pathToModule);

  return res;
}, {});

module.exports = () => {
  return modules;
};
