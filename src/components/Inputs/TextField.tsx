import React from "react";
import classNames from "classnames/bind";
import { pipe, path, reject, equals, keys } from "ramda";

import styles from "./Inputs.module.scss";

const cx = classNames.bind(styles);

type Props = {
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, name, value, defaultValue, error, helperText, onChange }, ref) => {
    return (
      <label className={cx("baseLabel", { error })}>
        {<span className={cx("baseTextLabel")}>{label}</span>}
        <input
          ref={ref}
          className={cx("baseInput")}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {!!helperText && <span className={cx("helperText")}>{helperText}</span>}
      </label>
    );
  },
);

TextField.displayName = "TextField";
export default TextField;
