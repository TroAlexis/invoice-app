const path = require("path");

const PATH_TO_SRC = "./src";

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
    },
  },
};
