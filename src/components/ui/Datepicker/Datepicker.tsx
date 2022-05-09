import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withFormLabel, {
  WithFormLabelProps,
} from "../hocs/withFormLabel/withFormLabel";
import styles from "./Datepicker.module.scss";
import { classNames } from "assets/utils/dom";
import { InputBase } from "components/ui/Input/Input";
import Icon from "components/ui/Icon/Icon";

export function DatepickerBase<
  CustomModifierNames extends string,
  WithRange extends boolean | undefined
>(
  props: ReactDatePickerProps<CustomModifierNames, WithRange> &
    WithFormLabelProps
) {
  const wrapperClasses = classNames([props.wrapperClassName, styles.wrapper]);
  const input = props.customInput || customInput();

  return (
    <ReactDatePicker
      {...props}
      wrapperClassName={wrapperClasses}
      customInput={input}
    />
  );
}

function customInput(): JSX.Element {
  return (
    <InputBase
      inputClassName={styles.input}
      icon={({ classes }) => (
        <Icon name="calendar" className={classNames([classes, styles.icon])} />
      )}
    />
  );
}

export default withFormLabel(DatepickerBase);
