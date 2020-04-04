import React from "react";
import classNames from "classnames/bind";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type Props = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon?: string;
  color?: "default" | "primary";
  loading?: boolean;
  onClick?: () => void;
};
const Button: React.FC<Props> = ({ type, icon, color = "default", loading, onClick, children }) => {
  return (
    <button className={cx("btn", color)} onClick={onClick} type={type}>
      {loading ? (
        <FontAwesomeIcon icon="spinner" spin />
      ) : (
        !!icon && <FontAwesomeIcon icon={icon as IconName} />
      )}
      {children}
    </button>
  );
};

export default Button;
