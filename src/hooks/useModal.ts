import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen?: boolean;
}

type Resolver<Result> = (res: Result) => void;
type Rejector = (reason: string) => void;

export default function useModal<Result>({ isOpen: open }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);
  const resolver = useRef<Resolver<Result> | null>(null);
  const rejector = useRef<Rejector | null>(null);

  const handleSubmit = (res: Result) => {
    if (resolver.current) {
      resolver.current(res);
    }
  };

  const getResult = () => {
    return new Promise<Result>((resolve) => {
      resolver.current = (res) => {
        resolve(res);

        resolver.current = null;
        rejector.current = null;
      };
    });
  };

  const getModalInput = async () => {
    setIsOpen(true);

    const result = await getResult();

    setIsOpen(false);

    return result;
  };

  // Reject promise if submission failed
  useEffect(() => () => {
    if (resolver.current && rejector.current) {
      rejector.current("Unmounted component");
    }
  });

  return {
    isOpen,
    handleSubmit,
    getModalInput,
  };
}
