import React from "react";

export type Falsy = false | 0 | "" | null | undefined;
export type ClassName = string | Falsy;
export type ClassNamesObject = Record<string, true | Falsy>;
export type ClassNamesArray = Array<ClassName>;
export type ClassNames = ClassName | ClassNamesObject | ClassNamesArray;

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
