import styles from "./withFormLabel.module.scss";
import { SlotProps, WithForwardedRef } from "assets/js/types/shared";
import React, { forwardRef } from "react";
import { withDisplayName } from "assets/js/utils/hoc";
import { classNames } from "assets/js/utils/dom";

export interface WithFormLabelProps {
  label?: string | ((props: SlotProps) => JSX.Element);
  className?: string;
  wrapperClassName?: string;
}

function getWithFormLabelComponent<Props extends WithFormLabelProps>(
  WrappedComponent: React.ComponentType<Props>
) {
  return ({ fRef, ...props }: Props & WithForwardedRef) => {
    const labelElement = getLabelElement(props.label);
    const wrappedClasses = classNames([props.className, styles.labeled]);
    const wrapperClasses = classNames([props.wrapperClassName, styles.wrapper]);

    return (
      <div className={wrapperClasses}>
        {props.label && labelElement}

        <WrappedComponent
          {...(props as Props)}
          className={wrappedClasses}
          ref={fRef}
        />
      </div>
    );
  };
}

function getLabelElement(label: WithFormLabelProps["label"]) {
  return typeof label === "function" ? (
    label({ classes: styles.label })
  ) : (
    <span className={styles.label}>{label}</span>
  );
}

export default function withFormLabel<Props extends WithFormLabelProps>(
  WrappedComponent: React.ComponentType<Props>
) {
  const ComponentWithFormLabel =
    getWithFormLabelComponent<Props>(WrappedComponent);

  const Component = withDisplayName<Props>(
    ComponentWithFormLabel,
    WrappedComponent,
    "withFormLabel"
  );

  return forwardRef<HTMLElement, Props>((props, ref) => {
    return <Component {...props} fRef={ref} />;
  });
}
