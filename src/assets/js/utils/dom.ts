import { BasicSlot, RenderSlot } from "types/shared";

export const renderSlot = (
  slot?: BasicSlot,
  ...args: Parameters<RenderSlot>
) => {
  if (slot) {
    return typeof slot === "string" ? slot : slot(...args);
  }

  return null;
};
