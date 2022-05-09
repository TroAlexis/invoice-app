"use strict";

const ignoredPatterns = ["react-datepicker"];
const cases = {
  kebab: "([a-z][a-z0-9]*)(-[a-z0-9]+)*",
};

module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
    "stylelint-config-prettier-scss",
  ],
  rules: {
    "selector-class-pattern": [
      withIgnoredPatterns(cases.kebab, ignoredPatterns),
      {
        message: "Expected class selector to be lol",
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
  },
};

function withIgnoredPatterns(pattern, patterns) {
  const ignoredModulesPatterns = patterns.map(
    (ignoredPattern) => `((${ignoredPattern}).*)|`
  );

  return `^(${ignoredModulesPatterns.join("")}(${pattern}))$`;
}
