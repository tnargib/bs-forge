import React from "react";
import { observer } from "mobx-react";

import { Toolbar, Container } from "@material-ui/core";

import SettingsHeader from "./SettingsHeader";
import SettingForm from "../../components/Forms/SettingForm";

import AppDataConnector, {
  Settings as SettingsType,
} from "../../services/connectors/AppDataConnector";

const APP_DATA = new AppDataConnector();

const Settings: React.FC = () => {
  const handleSubmit = (data: SettingsType): void => {
    // TODO: Catch save error
    APP_DATA.setSettings(data);
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
