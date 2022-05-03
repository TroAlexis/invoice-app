import React, { HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.scss";
import { Size } from "@/constants/size";
import { classNames } from "assets/utils/dom";
import { SlotProps } from "@/types/shared";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  label?: string | ((props: SlotProps) => JSX.Element);
  size?: Size.SMALL;
  type?: HTMLInputTypeAttribute;
}

export default function Input({
  label,
  size = Size.SMALL,
  type = "text",
}: Props) {
  const labelElement = getLabelElement(label);

  const wrapperClasses = classNames([styles.wrapper, size && styles[size]]);

  return (
    <div className={wrapperClasses}>
      <input type={type} className={styles.input} />

      {label && labelElement}
    </div>
  );
}

function getLabelElement(label: Props["label"]) {
  return typeof label === "function" ? (
    label({ classes: styles.label })
  ) : (
    <span className={styles.label}>{label}</span>
  );
}
