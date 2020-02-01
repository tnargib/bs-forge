import React from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type Props = {
  icon: string;
};
const Button: React.FC<Props> = ({ children, icon }) => {
  return (
    <button className={cx("container")}>
      <FontAwesomeIcon icon="align-justify" />
      {children}
    </button>
  );
};

export default Button;
