import React, { forwardRef, HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.scss";
import { Size } from "constants/size";
import { classNames } from "utils/dom";
import withFormLabel, {
  WithFormLabelProps,
} from "components/ui/hocs/withFormLabel/withFormLabel";
import { RenderSlotProps, RenderSlotWithProps } from "types/shared";

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

interface ComponentProps {
  inputClassName?: string;
  size?: Size.SMALL;
  type?: HTMLInputTypeAttribute;
  icon?: RenderSlotWithProps<"icon", ComponentProps>;
}

interface Props extends ComponentProps, InputProps, WithFormLabelProps {}

export const InputBase = forwardRef<HTMLInputElement, Props>(
  (
    {
      size = Size.SMALL,
      type = "text",
      className,
      inputClassName,
      icon,
      ...inputProps
    },
    ref
  ) => {
    const wrapperClasses = classNames([className, styles.wrapper]);
    const inputClasses = classNames([
      inputClassName,
      styles.input,
      size && styles[size],
      icon && styles["has-icon"],
    ]);

    return (
      <div className={wrapperClasses}>
        <input type={type} className={inputClasses} ref={ref} {...inputProps} />

        {renderInputIcon(icon, { size })}
      </div>
    );
  }
);

function renderInputIcon<P extends ComponentProps>(
  icon: P["icon"],
  props: RenderSlotProps<"icon", P>
) {
  const iconClasses = classNames([styles.icon]);

  return icon ? icon({ ...props, classes: iconClasses }) : null;
}

export default withFormLabel(InputBase);
