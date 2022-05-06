import styles from "./withFormLabel.module.scss";
import { SlotProps } from "@/types/shared";
import React from "react";
import { withDisplayName } from "assets/utils/hoc.js";
import { classNames } from "assets/utils/dom";

export interface WithFormLabelProps {
  label?: string | ((props: SlotProps) => JSX.Element);
  className?: string;
}

export default function withFormLabel<T extends WithFormLabelProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  const ComponentWithFormLabel = (props: T) => {
    const labelElement = getLabelElement(props.label);
    const wrappedClasses = classNames([props.className, styles.labeled]);

    return (
      <div className={styles.wrapper}>
        {props.label && labelElement}

        <WrappedComponent {...props} className={wrappedClasses} />
      </div>
    );
  };

  return withDisplayName(
    ComponentWithFormLabel,
    WrappedComponent,
    "withFormLabel"
  );
}

function getLabelElement(label: WithFormLabelProps["label"]) {
  return typeof label === "function" ? (
    label({ classes: styles.label })
  ) : (
    <span className={styles.label}>{label}</span>
  );
}
