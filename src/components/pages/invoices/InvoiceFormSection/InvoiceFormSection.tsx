import { SyntheticEvent } from "react";

export interface Props<V, N> {
  values: V;
  name: N;
  onChange: (name: N, value: V) => void;
  children: (props: SlotProps<V, N>) => JSX.Element;
}

interface SlotProps<V, N> {
  handleInput: (e: SyntheticEvent<HTMLInputElement>) => void;
  values: V;
}

export default function InvoiceFormSection<V, N extends string>({
  values,
  name,
  onChange,
  children,
}: Props<V, N>) {
  const handleInput: SlotProps<V, N>["handleInput"] = (e) => {
    const target = e.target as HTMLInputElement;

    return onChange(name, { ...values, [target.name]: target.value });
  };

  return children({ handleInput, values });
}
