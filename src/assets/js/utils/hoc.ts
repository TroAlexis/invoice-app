import React from "react";

export const getDisplayName = <T>(
  component: React.ComponentType<T>,
  hocPrefix: string
) => {
  const displayName = component.displayName || component.name || "Component";

  return `${hocPrefix}${displayName}`;
};

export const withDisplayName = <T>(
  wrapper: React.ComponentType<T>,
  wrappee: React.ComponentType<T>,
  prefix: string
) => {
  wrapper.displayName = getDisplayName(wrappee, prefix);

  return wrapper;
};
