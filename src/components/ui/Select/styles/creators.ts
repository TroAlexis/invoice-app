import { StylesCreator } from "components/ui/Select/styles/index";

const stylesContext = require.context(
  "./",
  true,
  /^\.\/(?!index|creators).+\.ts$/
);

const modules = stylesContext.keys().map((module) => {
  return module.replace(/^\.\/(.+)\.ts$/, "$1");
});

const creators: StylesCreator[] = modules.map(
  (module) => require(`./${module}.ts`).default
);

export default creators;
