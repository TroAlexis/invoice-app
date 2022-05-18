import authApi from "@/api/auth";
import Icon from "components/ui/Icon/Icon";
import iconStyles from "components/ui/Icon/Icon.module.scss";
import { Size } from "constants/size";
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  forwardRef,
} from "react";
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
    const classes = getClasses(props);

    return (
      <nav
        className={classes.className}
        ref={ref}
        onClick={authApi.logOut}
        {...attrs}
      >
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
            <Profile />
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
    <span className={classes}>
      <Icon name="logo" className={styles.icon} size={Size.MEDIUM} />
    </span>
  );
}

function Navigation() {
  return (
    <ul className={styles.container}>
      <li>..</li>
    </ul>
  );
}

const avatarClasses = classNames([
  iconStyles.icon,
  iconStyles.medium,
  styles.avatar,
]);

function Profile() {
  return (
    <figure className={styles.container}>
      <img src="" alt="Avatar" className={avatarClasses} />
    </figure>
  );
}

export default withDisplayName(TheSidebar, "TheSidebar");
