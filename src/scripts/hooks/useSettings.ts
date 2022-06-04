import { AppTheme } from "@customTypes/index";
import React from "react";
import { createContainer } from "unstated-next";

const useSettings = () => {
  const [appTheme, setAppTheme] = React.useState<AppTheme>("light");
  const switchAppTheme = () => {
    appTheme === "dark" ? setAppTheme("light") : setAppTheme("dark");
  };

  return {
    appTheme,
    switchAppTheme,
  };
};

export const SettingsContainer = createContainer(useSettings);
