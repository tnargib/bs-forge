import React, { SyntheticEvent } from "react";
import classNames from "classnames/bind";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type Props = {
  icon?: string;
  justIcon?: boolean;
  type?: "default" | "primary";
  shape?: "square" | "round";
  loading?: boolean;
  active?: boolean;
  onClick?: () => void;
};
const Button: React.FC<Props> = ({
  children,
  icon,
  justIcon = false,
  type = "default",
  shape = "square",
  loading = false,
  active = false,
  onClick,
}) => {
  return (
    <button className={cx("btn", { justIcon }, type, { active }, shape)} onClick={onClick}>
      {loading ? (
        <FontAwesomeIcon icon="spinner" spin />
      ) : (
        !!icon && <FontAwesomeIcon icon={icon as IconName} />
      )}
      {!justIcon && children}
    </button>
  );
};

export default Button;
