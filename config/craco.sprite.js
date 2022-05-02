const svgRegex = /\.svg$/;
const spriteQueryRegex = /sprite/;

const spriteLoader = {
  test: svgRegex,
  resourceQuery: spriteQueryRegex,
  use: ["svg-sprite-loader"],
};

const addSpriteLoader = (webpackConfig) => {
  const loaders = webpackConfig.module.rules.find((rule) => rule.oneOf);
  const svgRules = loaders.oneOf.find(
    ({ test }) => test.toString() === svgRegex.toString()
  );

  svgRules.resourceQuery = { not: [spriteQueryRegex] };

  loaders.oneOf.unshift(spriteLoader);

  console.log(loaders.oneOf);
  return webpackConfig;
};

module.exports = {
  addSpriteLoader,
};
