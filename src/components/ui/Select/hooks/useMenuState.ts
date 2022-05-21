import { useEffect, useState } from "react";
import { ValueOf } from "types/shared";
import { isUndefined } from "utils/common";

const MenuStates = {
  OPEN: true,
  CLOSED: false,
} as const;

type MenuState = ValueOf<typeof MenuStates>;

export function useMenuState(menuIsOpenProp: MenuState | undefined) {
  const initialState = !!menuIsOpenProp;

  const [menuIsOpen, setMenuIsOpen] = useState<MenuState>(initialState);
  const [menuIsOpenAnimatable, setMenuIsOpenAnimatable] =
    useState<MenuState>(initialState);

  const openMenu = () => {
    setMenuIsOpenAnimatable(MenuStates.OPEN);
    setMenuIsOpen(MenuStates.OPEN);
  };

  const closeMenu = () => setMenuIsOpen(MenuStates.CLOSED);
  const closeMenuAnimated = () => setMenuIsOpenAnimatable(MenuStates.CLOSED);

  useEffect(() => {
    const handler = menuIsOpenProp ? openMenu : closeMenuAnimated;

    handler();
  }, [menuIsOpenProp]);

  const isOpenPropProvided = !isUndefined(menuIsOpenProp);

  return {
    menuIsOpen,
    menuIsOpenAnimatable,
    onMenuOpen: isOpenPropProvided ? undefined : openMenu,
    onMenuClose: isOpenPropProvided ? undefined : closeMenuAnimated,
    onMenuCloseAnimated: closeMenu,
  };
}
