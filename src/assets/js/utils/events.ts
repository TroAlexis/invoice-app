import { EventHandler, SyntheticEvent } from "react";

export const withEventPrevent = <E extends SyntheticEvent>(
  e: E,
  handler: EventHandler<E>
) => {
  e.preventDefault();

  handler(e);
};
