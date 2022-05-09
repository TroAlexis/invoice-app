import React from "react";

export type ClassNamesObject = Record<string, boolean | undefined>;
export type ClassNamesArray = Array<string | false | undefined>;
export type ClassNames = string | ClassNamesObject | ClassNamesArray;

export interface SlotProps {
  classes?: string;
}

export type RenderSlot = (props?: SlotProps) => JSX.Element;

export type RenderSlotProps<SlotName extends string, ParentProps> = SlotProps &
  Omit<ParentProps, SlotName>;

export type RenderSlotWithProps<SlotName extends string, ParentProps> = (
  props: RenderSlotProps<SlotName, ParentProps>
) => JSX.Element;

export interface WithForwardedRef {
  fRef?: React.Ref<HTMLElement> | null;
}
