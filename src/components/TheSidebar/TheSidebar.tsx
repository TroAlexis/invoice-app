import styles from "./TheSidebar.module.scss";
import iconStyles from "components/ui/Icon/Icon.module.scss";
import Icon from "components/ui/Icon/Icon";
import { Size } from "assets/js/constants/size";
import { classNames } from "assets/js/utils/dom";

export default function TheSidebar() {
  return (
    <nav className={styles.sidebar}>
      <Logo />
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={styles.profile}>
        <Profile />
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <span className={styles.logo}>
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
