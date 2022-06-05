import { DarkTheme, Theme } from "@react-navigation/native";
import { darkestGray, darkGray, java, white } from "@styles/appStyles";

export const appDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: white,
    notification: java,
    card: darkGray,
    background: darkestGray,
  },
};
