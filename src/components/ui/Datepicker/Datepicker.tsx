import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withFormLabel, {
  WithFormLabelProps,
} from "../hocs/withFormLabel/withFormLabel";
import styles from "./Datepicker.module.scss";
import { classNames } from "assets/js/utils/dom";
import { InputBase } from "components/ui/Input/Input";
import Icon from "components/ui/Icon/Icon";

export function DatepickerBase<
  CustomModifierNames extends string,
  WithRange extends boolean | undefined
>(
  props: ReactDatePickerProps<CustomModifierNames, WithRange> &
    WithFormLabelProps
) {
  const classes = getClasses(props);
  const input = props.customInput || customInput();

  return <ReactDatePicker {...props} customInput={input} {...classes} />;
}

function getClasses<M extends string, W extends boolean | undefined>(
  props: ReactDatePickerProps<M, W>
): Partial<ReactDatePickerProps<M, W>> {
  const wrapperClassName = classNames([props.wrapperClassName, styles.wrapper]);

  const calendarClassName = classNames([
    props.calendarClassName,
    styles.calendar,
  ]);

  const dayClassName = (date: Date) => {
    return classNames([props.dayClassName?.(date), styles.day]) || null;
  };

  const monthClassName = (date: Date) => {
    return classNames([props.monthClassName?.(date), styles.month]) || null;
  };

  return {
    wrapperClassName,
    calendarClassName,
    dayClassName,
    monthClassName,
  };
}

function customInput<
  M extends string,
  W extends boolean | undefined
>(): ReactDatePickerProps<M, W>["customInput"] {
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
