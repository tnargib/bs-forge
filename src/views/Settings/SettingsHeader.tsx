import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import { Settings } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

type Props = {};
const SettingsHeader: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6">Settings</Typography>

        <div className={classes.grow} />

        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default SettingsHeader;
