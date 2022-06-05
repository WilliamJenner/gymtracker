import { DefaultTheme, Theme } from "@react-navigation/native";
import {
  black,
  charcoal,
  darkestGray,
  goldenSand,
  sandyBrown,
} from "@styles/appStyles";

export const appLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: darkestGray,
    notification: charcoal,
    card: sandyBrown,
    background: goldenSand,
    border: black,
  },
};
