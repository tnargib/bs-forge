import React from "react";
import classNames from "classnames/bind";
import { useForm, ErrorMessage } from "react-hook-form";

import TextField from "../Inputs/TextField";
import Button from "../Button/Button";

import styles from "./Forms.module.scss";

const cx = classNames.bind(styles);

type FormData = {
  gameLocation: string;
};
type Props = {};
const SettingForm: React.FC<Props> = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form className={cx("baseForm")} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Game location"
        name="gameLocation"
        error={!!errors.gameLocation}
        ref={register({ required: "Game location is required" })}
        helperText={errors.gameLocation && errors.gameLocation.message}
      />

      <Button color="primary">Save</Button>
    </form>
  );
};

export default SettingForm;
