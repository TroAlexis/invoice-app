import React, { forwardRef, HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.scss";
import { Size } from "@/constants/size";
import { classNames } from "assets/utils/dom";
import withFormLabel, {
  WithFormLabelProps,
} from "components/ui/hocs/withFormLabel/withFormLabel";

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "size">;

interface Props extends InputProps, WithFormLabelProps {
  size?: Size.SMALL;
  type?: HTMLInputTypeAttribute;
}

export const InputBase = forwardRef<HTMLInputElement, Props>(
  ({ size = Size.SMALL, type = "text", className }, ref) => {
    const wrapperClasses = classNames([className, styles.wrapper]);
    const inputClasses = classNames([styles.input, size && styles[size]]);

    return (
      <div className={wrapperClasses}>
        <input type={type} className={inputClasses} ref={ref} />
      </div>
    );
  }
);

export default withFormLabel(InputBase);
