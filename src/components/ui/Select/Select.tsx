import { composeStyles } from "components/ui/Select/styles";
import { useState } from "react";
import ReactSelect, { GroupBase, Props } from "react-select";
import { ValueOf } from "types/shared";
import { isUndefined } from "utils/common";

const MenuStates = {
  OPEN: true,
  CLOSED: false,
} as const;

type MenuState = ValueOf<typeof MenuStates>;

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const styles = composeStyles(props);
  const { isOpen, openMenu, closeMenu } = useMenuState(
    !!props.defaultMenuIsOpen
  );

  const isMenuOpen = isUndefined(props.menuIsOpen) ? isOpen : props.menuIsOpen;

  return (
    <ReactSelect
      {...props}
      styles={styles}
      blurInputOnSelect
      menuIsOpen={isMenuOpen}
      onMenuOpen={openMenu}
      onMenuClose={closeMenu}
    />
  );
}

function useMenuState(initialState: MenuState) {
  const [isOpen, setIsOpen] = useState<MenuState>(initialState);

  const openMenu = () => setIsOpen(MenuStates.OPEN);
  const closeMenu = () => setIsOpen(MenuStates.CLOSED);

  return { isOpen, openMenu, closeMenu };
}
