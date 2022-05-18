import React, { ComponentType } from "react";

export const getDisplayName = <T>(
  component: React.ComponentType<T>,
  defaultName: string = "Component"
) => {
  return component.displayName || component.name || defaultName;
};

export const withDisplayName = <T>(
  component: ComponentType<T>,
  name: string
) => {
  component.displayName = name;

  return component;
};

export const withWrappeeDisplayName = <T, W = T>(
  wrapper: React.ComponentType<T>,
  wrappee: React.ComponentType<W>,
  prefix: string = ""
) => {
  const displayName = `${prefix}${getDisplayName(wrappee)}`;

  withDisplayName(wrapper, displayName);

  return wrapper;
};
