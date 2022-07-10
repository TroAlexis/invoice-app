import { EventHandler, SyntheticEvent, useCallback, useRef } from "react";

export const useEventSelf = <E extends HTMLElement>() => {
  const ref = useRef<E>(null);

  const withEventSelf = useCallback(
    <C extends EventHandler<SyntheticEvent<E>>>(callback: C) => {
      return (event: SyntheticEvent<E>) => {
        if (event.target === ref.current) {
          callback(event);
        }
      };
    },
    []
  );

  return { ref, withEventSelf };
};
