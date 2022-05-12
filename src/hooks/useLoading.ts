import { useState } from "react";
import { Callback } from "types/shared";

const useLoading = (initialState: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(initialState);

  const withLoading = <F extends Callback>(callback: F) => {
    return async (...args: Parameters<F>) => {
      setLoading(true);

      await callback(...args);

      setLoading(false);
    };
  };

  return { loading, setLoading, withLoading };
};

export default useLoading;
