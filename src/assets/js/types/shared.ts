import {
  Dispatch,
  FunctionComponent,
  Ref,
  SetStateAction,
  SyntheticEvent,
} from "react";

export type ValueOf<T> = T[keyof T];
export type Falsy = false | 0 | "" | null | undefined;

export type PropsOf<T extends FunctionComponent> = Parameters<T>[0];

export type Callback = (...args: any[]) => any;
export type UseStateSetter<T> = Dispatch<SetStateAction<T>>;

export type AwaitedReturnType<T extends Callback> = Awaited<ReturnType<T>>;

export type ClassName = string | Falsy;
export type ClassNamesObject = Record<string, true | Falsy>;
export type ClassNamesArray = Array<ClassNames>;
export type ClassNames = ClassName | ClassNamesObject | ClassNamesArray;

export interface SlotProps {
  classes?: string;
}

export type BasicSlot = string | RenderSlot;

export type RenderSlot = (props?: SlotProps) => JSX.Element;

export type RenderSlotProps<SlotName extends string, ParentProps> = SlotProps &
  Omit<ParentProps, SlotName>;

export type RenderSlotWithProps<SlotName extends string, ParentProps> = (
  props: RenderSlotProps<SlotName, ParentProps>
) => JSX.Element;

export interface WithForwardedRef {
  fRef?: Ref<HTMLElement> | null;
}

export type InputHandler<T = void> = (e: SyntheticEvent<HTMLInputElement>) => T;
