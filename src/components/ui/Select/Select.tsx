import { composeStyles } from "components/ui/Select/styles";
import ReactSelect, { GroupBase, Props } from "react-select";

export interface SelectProps {
  outline?: boolean;
}

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & SelectProps) {
  const { outline, ...$props } = props;

  const styles = composeStyles(props);

  return <ReactSelect {...$props} styles={styles} blurInputOnSelect />;
}
