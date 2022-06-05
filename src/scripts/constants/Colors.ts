import { charcoal, lightGray } from "@styles/appStyles";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    interactiveBackground: charcoal,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    interactiveBackground: lightGray,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
