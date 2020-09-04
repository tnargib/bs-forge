import React from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button, InputAdornment, IconButton } from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";

import { FileSystemConnector } from "../../services/connectors";
import { Settings } from "../../services/connectors/AppDataConnector";

const FILE = new FileSystemConnector();

const useStyles = makeStyles({
  root: {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "& .MuiFormControl-root": {
      minWidth: 150,
    },
  },
});

type FormData = Settings;
type Props = {
  onSubmit(values: FormData): void;
};
const SettingForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, errors, setValue, control } = useForm<FormData>();

  const handleSelectFolder = () => {
    FILE.selectFolder().then(path => {
      setValue("game_location", path || "", { shouldValidate: true });
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextField}
        control={control}
        rules={{ required: "Game location is required" }}
        name="game_location"
        label="Game location"
        defaultValue=""
        error={!!errors.game_location}
        helperText={errors.game_location && errors.game_location.message}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSelectFolder}>
                <FolderOpen />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" color="primary">
        Save
      </Button>
    </form>
  );
};

export default SettingForm;
