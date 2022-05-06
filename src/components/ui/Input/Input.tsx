import React, { HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.scss";
import { Size } from "@/constants/size";
import { classNames } from "assets/utils/dom";
import withFormLabel, {
  WithFormLabelProps,
} from "components/ui/hocs/withFormLabel/withFormLabel";

interface InputProps
  extends React.ComponentPropsWithoutRef<"div">,
    WithFormLabelProps {
  size?: Size.SMALL;
  type?: HTMLInputTypeAttribute;
}

export function InputBase({
  size = Size.SMALL,
  type = "text",
  className,
}: InputProps) {
  const wrapperClasses = classNames([className, styles.wrapper]);
  const inputClasses = classNames([styles.input, size && styles[size]]);

  return (
    <div className={wrapperClasses}>
      <input type={type} className={inputClasses} />
    </div>
  );
}

export default withFormLabel(InputBase);
