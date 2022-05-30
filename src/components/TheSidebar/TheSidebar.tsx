import authApi from "@/api/modules/auth/auth";
import withTransition from "components/ui/hocs/withTransition/withTransition";
import Icon from "components/ui/Icon/Icon";
import iconStyles from "components/ui/Icon/Icon.module.scss";
import { Size } from "constants/size";
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  forwardRef,
} from "react";
import Avatar, { AvatarConfig } from "react-nice-avatar";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { classNames } from "utils/classnames";
import { withDisplayName } from "utils/hoc";
import styles from "./TheSidebar.module.scss";

export interface Classes {
  className?: string;
  logoClassName?: string;
  navigationClassName?: string;
  profileClassName?: string;
}

interface Props
  extends ComponentPropsWithRef<"nav">,
    Omit<Classes, "className"> {
  isAuthenticated?: boolean;
}

const ProfileWithTransition = withTransition(
  Profile,
  { component: null },
  {
    classNames: "fade",
    timeout: 200,
    appear: true,
    unmountOnExit: true,
  }
);

const TheSidebar = forwardRef<HTMLElement, Props>(
  ({ children, ...props }, ref) => {
    const {
      className,
      profileClassName,
      logoClassName,
      navigationClassName,
      isAuthenticated,
      ...attrs
    } = props;
    const user = authApi.getUser();
    const avatar = user?.user_metadata?.avatar;

    const classes = getClasses(props);

    return (
      <nav className={classes.className} ref={ref} {...attrs}>
        <Logo className={classes.logoClassName} />
        <div className={classes.navigationClassName}>
          {children || <Navigation />}
        </div>
        <CSSTransition
          timeout={200}
          classNames="fade"
          in={isAuthenticated}
          unmountOnExit
        >
          <div className={classes.profileClassName}>
            <ProfileWithTransition
              visible={isAuthenticated}
              props={{ avatar, onClick: authApi.logOut }}
            />
          </div>
        </CSSTransition>
      </nav>
    );
  }
);

function getClasses(props: Partial<Props>): Classes {
  const className = classNames([styles.sidebar, props.className]);
  const navigationClassName = classNames([
    styles.navigation,
    props.navigationClassName,
  ]);
  const profileClassName = classNames([styles.profile, props.profileClassName]);
  const logoClassName = classNames([props.logoClassName]);

  return { className, navigationClassName, profileClassName, logoClassName };
}

function Logo({ className }: ComponentPropsWithoutRef<"span">) {
  const classes = classNames([className, styles.logo]);

  return (
    <NavLink className={classes} to="/invoices">
      <Icon name="logo" className={styles.icon} size={Size.MEDIUM} />
    </NavLink>
  );
}

function Navigation() {
  return (
    <ul className={styles.container}>
      <li />
    </ul>
  );
}

const avatarClasses = classNames([
  iconStyles.icon,
  iconStyles.medium,
  styles.avatar,
]);

type ProfileProps = {
  avatar: AvatarConfig;
} & ComponentPropsWithoutRef<"figure">;

function Profile({ avatar, ...props }: ProfileProps) {
  return (
    <figure className={styles.container} {...props}>
      <Avatar className={avatarClasses} {...avatar} />
    </figure>
  );
}

export default withDisplayName(TheSidebar, "TheSidebar");
