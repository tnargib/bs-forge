import React from "react";
import classNames from "classnames/bind";

import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);

type Props = {};
const LoaderPointInline: React.FC<Props> = () => {
  return (
    <div className={cx("lds-ellipsis-wrapper")}>
      <div className={cx("lds-ellipsis")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderPointInline;
