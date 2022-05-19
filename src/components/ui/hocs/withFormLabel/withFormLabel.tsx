import React, { forwardRef } from "react";
import { SlotProps, WithForwardedRef } from "types/shared";
import { classNames } from "utils/classnames";
import { withWrappeeDisplayName } from "utils/hoc";
import styles from "./withFormLabel.module.scss";

export interface WithFormLabelProps {
  label?: string | ((props: SlotProps) => JSX.Element);
  className?: string;
  wrapperClassName?: string;
}

function getWithFormLabelComponent<Props extends WithFormLabelProps>(
  WrappedComponent: React.ComponentType<Props>
) {
  return ({
    fRef,
    wrapperClassName,
    className,
    label,
    ...props
  }: Props & WithForwardedRef) => {
    const labelElement = getLabelElement(label);
    const wrappedClasses = classNames([className, styles.labeled]);
    const wrapperClasses = classNames([wrapperClassName, styles.wrapper]);

    return (
      <div className={wrapperClasses}>
        {label && labelElement}

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
  ComponentToWrap: React.ComponentType<Props>
) {
  const ComponentWithFormLabel =
    getWithFormLabelComponent<Props>(ComponentToWrap);

  const WrappedComponent = withWrappeeDisplayName<Props>(
    ComponentWithFormLabel,
    ComponentToWrap,
    "withFormLabel"
  );

  const WrappedComponentWithForwardedRef = forwardRef<HTMLElement, Props>(
    (props, ref) => {
      return <WrappedComponent {...props} fRef={ref} />;
    }
  );

  return withWrappeeDisplayName(
    WrappedComponentWithForwardedRef,
    WrappedComponent
  );
}
