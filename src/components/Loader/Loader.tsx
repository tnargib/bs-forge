import React from "react";
import classNames from "classnames/bind";

import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);

type Props = {};
const Loader: React.FC<Props> = () => {
  return (
    <div className={cx("sk-folding-cube")}>
      <div className={cx("sk-cube1", "sk-cube")}></div>
      <div className={cx("sk-cube2", "sk-cube")}></div>
      <div className={cx("sk-cube4", "sk-cube")}></div>
      <div className={cx("sk-cube3", "sk-cube")}></div>
    </div>
  );
};

export default Loader;
