const iconsContext = require.context("assets/images/icons/", true, /\.svg$/);
const icons = iconsContext.keys().map((name) => {
  return name.replace("./", "");
});

icons.forEach((icon) => {
  require(`assets/images/icons/${icon}?sprite`);
});

export default icons;
