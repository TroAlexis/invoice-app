import Heading, { Props as HeadingProps } from "components/ui/Heading/Heading";
import Icon, { Props as IconProps } from "components/ui/Icon/Icon";
import Text from "components/ui/Text/Text";
import { ComponentPropsWithoutRef } from "react";
import { BasicSlot } from "types/shared";
import { classNames } from "utils/classnames";
import { renderSlot } from "utils/dom";
import styles from "./AuthFormInfo.module.scss";

export interface Props extends ComponentPropsWithoutRef<"div"> {
  heading: Omit<HeadingProps, "level">;
  description: BasicSlot;
  icon: IconProps;
}

export default function AuthFormInfo({
  className,
  icon,
  heading,
  description,
  ...props
}: Props) {
  const classes = classNames([className, styles.wrapper]);

  const { className: iconClassName, ...iconProps } = icon;
  const iconClasses = classNames([iconClassName, styles.icon]);

  const { className: headingClassName, ...headingProps } = heading;
  const headingClasses = classNames([headingClassName, styles.heading]);

  return (
    <div className={classes} {...props}>
      <Icon className={iconClasses} {...iconProps} />

      <Heading level="h3" className={headingClasses} {...headingProps} />

      <Text>{renderSlot(description)}</Text>
    </div>
  );
}
