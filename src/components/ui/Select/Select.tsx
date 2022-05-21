import Menu from "components/ui/Select/components/Menu";
import { useMenuState } from "components/ui/Select/hooks/useMenuState";
import { composeStyles } from "components/ui/Select/styles";
import ReactSelect, { GroupBase, Props } from "react-select";

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const styles = composeStyles(props);
  const menuProps = useMenuState(props.menuIsOpen);

  return (
    <ReactSelect
      {...props}
      styles={styles}
      components={{ Menu }}
      blurInputOnSelect
      {...menuProps}
    />
  );
}
