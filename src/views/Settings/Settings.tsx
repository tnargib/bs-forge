import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";

import { Toolbar, Container } from "@material-ui/core";

import SettingsHeader from "./SettingsHeader";
import SettingForm from "../../components/Forms/SettingForm";

import { useStores } from "../../services/mobx/useStores";

const useStyles = makeStyles({
  content: {
    display: "flex",
  },
});

const Settings: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <SettingsHeader />
      <Toolbar />

      <Container maxWidth="sm">
        <SettingForm />
      </Container>
    </div>
  );
};

export default observer(Settings);
