import React from "react";
import { observer } from "mobx-react";
import { useSnackbar } from "notistack";

import { Toolbar, Container } from "@material-ui/core";

import SettingsHeader from "./SettingsHeader";
import SettingForm from "../../components/Forms/SettingForm";

import AppDataConnector, {
  Settings as SettingsType,
} from "../../services/connectors/AppDataConnector";

const APP_DATA = new AppDataConnector();

const Settings: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (data: SettingsType): void => {
    APP_DATA.setSettings(data)
      .then(() => enqueueSnackbar("Settings saved", { variant: "success" }))
      .catch(() => enqueueSnackbar("Error saving settings", { variant: "error" }));
  };

  return (
    <div>
      <SettingsHeader />
      <Toolbar />

      <Container maxWidth="sm">
        <SettingForm onSubmit={handleSubmit} />
      </Container>
    </div>
  );
};

export default observer(Settings);
