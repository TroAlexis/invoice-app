const path = require("path");
const { addSpriteLoader } = require("./config/craco.sprite");

const PATH_TO_SRC = "./src";
const PATH_TO_JS_ASSETS = `${PATH_TO_SRC}/assets/js`;

module.exports = {
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, PATH_TO_SRC)),
      components: path.join(
        path.resolve(__dirname, `${PATH_TO_SRC}/components`)
      ),
      assets: path.join(path.resolve(__dirname, `${PATH_TO_SRC}/assets`)),
      styles: path.join(
        path.resolve(__dirname, `${PATH_TO_SRC}/assets/styles`)
      ),
      images: path.join(
        path.resolve(__dirname, `${PATH_TO_SRC}/assets/images`)
      ),
      constants: path.join(
        path.resolve(__dirname, `${PATH_TO_JS_ASSETS}/constants`)
      ),
      types: path.join(path.resolve(__dirname, `${PATH_TO_JS_ASSETS}/types`)),
      utils: path.join(path.resolve(__dirname, `${PATH_TO_JS_ASSETS}/utils`)),
    },
    configure: (webpackConfig) => {
      return addSpriteLoader(webpackConfig);
    },
  },
};
