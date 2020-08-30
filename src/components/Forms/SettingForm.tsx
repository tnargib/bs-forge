import React from "react";
import classNames from "classnames/bind";
import { useForm, ErrorMessage } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";

import styles from "./Forms.module.scss";

import { FileSystemConnector } from "../../services/connectors";

const FILE = new FileSystemConnector();

const cx = classNames.bind(styles);

const useStyles = makeStyles(theme => ({
  root: {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "& .MuiFormControl-root": {
      minWidth: 150,
    },
  },
}));

type FormData = {
  gameLocation: string;
};
type Props = {};
const SettingForm: React.FC<Props> = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<FormData>();

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleSelectFolder = () => {
    console.log("lol2");
    FILE.selectFolder().then(res => {
      console.log("lol");
      console.log(res);
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField
        label="Game location"
        name="gameLocation"
        error={!!errors.gameLocation}
        ref={register({ required: "Game location is required" })}
        helperText={errors.gameLocation && errors.gameLocation.message}
      /> */}
      <TextField
        name="gameLocation"
        label="Game location"
        variant="outlined"
        fullWidth
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
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={e => console.log(e)}
        webkitdirectory=""
        style={{ display: "none" }}
      />

      <FormControl variant="outlined" margin="normal">
        <InputLabel>Song indexing</InputLabel>
        <Select label="Song indexing">
          <MenuItem>Hash</MenuItem>
          <MenuItem>Name</MenuItem>
        </Select>
      </FormControl>

      <Button color="primary">Save</Button>
    </form>
  );
};

export default SettingForm;
