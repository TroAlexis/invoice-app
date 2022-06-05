import withFormLabel, {
  WithFormLabelProps,
} from "components/ui/hocs/withFormLabel/withFormLabel";
import Menu from "components/ui/Select/components/Menu";
import { useMenuState } from "components/ui/Select/hooks/useMenuState";
import { composeStyles } from "components/ui/Select/styles";
import ReactSelect, { GroupBase, Props } from "react-select";

type SelectProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = WithFormLabelProps & Props<Option, IsMulti, Group>;

type SelectWrapper = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => JSX.Element;

const SelectBase: SelectWrapper = (props) => {
  const { styles, components, ...propsToSpread } = props;
  const composedStyles = composeStyles(props);
  const menuProps = useMenuState(props.menuIsOpen);

  const composedComponents = { Menu, ...components };

  return (
    <ReactSelect
      blurInputOnSelect
      components={composedComponents}
      {...menuProps}
      {...propsToSpread}
      styles={composedStyles}
    />
  );
};

const Select: SelectWrapper = (props) => {
  const Component = withFormLabel<typeof props>(SelectBase);

  return <Component {...props} />;
};

export default Select;
