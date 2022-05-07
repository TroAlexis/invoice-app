import React from "react";

export type ClassNamesObject = Record<string, boolean | undefined>;
export type ClassNamesArray = Array<string | false | undefined>;
export type ClassNames = string | ClassNamesObject | ClassNamesArray;

export interface SlotProps {
  classes: string;
}

export interface WithForwardedRef {
  fRef?: React.Ref<HTMLElement> | null;
}
