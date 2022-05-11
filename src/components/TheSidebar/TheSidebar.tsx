import styles from "./TheSidebar.module.scss";
import iconStyles from "components/ui/Icon/Icon.module.scss";
import Icon from "components/ui/Icon/Icon";
import { Size } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";

export interface Classes {
  className?: string;
  logoClassName?: string;
  navigationClassName?: string;
  profileClassName?: string;
}

interface Props
  extends ComponentPropsWithoutRef<"nav">,
    Omit<Classes, "className"> {}

export default function TheSidebar({ children, ...props }: Props) {
  const {
    className,
    profileClassName,
    logoClassName,
    navigationClassName,
    ...attrs
  } = props;
  const classes = getClasses(props);

  return (
    <nav className={classes.className} {...attrs}>
      <Logo className={classes.logoClassName} />
      <div className={classes.navigationClassName}>
        {children || <Navigation />}
      </div>
      <div className={classes.profileClassName}>
        <Profile />
      </div>
    </nav>
  );
}

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
