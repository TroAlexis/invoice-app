import { classNames } from "utils/classnames";

type CSSModule = Record<string, string>;

type MergeCssModules = (...modules: Array<CSSModule | undefined>) => CSSModule;

export const mergeCssModules: MergeCssModules = (...modules) => {
  return modules.reduce<CSSModule>((res, module) => {
    if (module) {
      Object.entries(module).forEach(([alias, className]) => {
        res[alias] = extendModule(res, [alias, className]);
      });
    }

    return res;
  }, {});
};

const extendModule = (module: CSSModule, [alias, className]: Array<string>) => {
  if (module[alias]) {
    return classNames([alias, className]);
  } else {
    return className;
  }
};
