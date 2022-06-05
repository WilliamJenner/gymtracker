import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export const black = "#000000";
export const darkestGray = "#29292c";
export const darkGray = "#3d3e44";
export const charcoal = "#264653";
export const java = "#2a9d8f";
export const goldenSand = "#e9c46a";
export const sandyBrown = "#f4a261";
export const burntSienna = "#e76f51";
export const mediumGray = "#9b9aa1";
export const lightGray = "#DBDBDB";
export const lightWarmGray = "#f5f5f5";
export const offWhite = "#b7bdc5";
export const tan = "#fcf8f2";
export const transparent = "rgba(0, 0, 0, 0)";
export const white = "#ffffff";
export const buttonBackground = burntSienna;
export const interactableBackground = java;
export const buttonText = white;

export const secondaryTextColor = (dark: boolean): string => {
  return dark ? mediumGray : darkGray;
};

export const inActiveTabColour = (dark: boolean): string => {
  return dark ? mediumGray : lightGray;
};

export const secondaryBackgroundColor = (
  dark: boolean
): StyleProp<ViewStyle> => {
  return dark
    ? appStyles.secondaryBackgroundDark
    : appStyles.secondaryBackgroundLight;
};

export const accentBackgroundColor = (dark: boolean): string => {
  return dark ? charcoal : charcoal;
};

export const buttonBackgroundColour = (dark: boolean): string => {
  return dark ? darkestGray : java;
};

export const buttonBorder = (dark: boolean): StyleProp<ViewStyle> => {
  return dark ? appStyles.buttonBorderDark : appStyles.buttonBorderLight;
};

export const switchTrackColor = (dark: boolean) => {
  return dark
    ? { false: mediumGray, true: white }
    : { false: mediumGray, true: lightGray };
};

export const switchThumbColor = (isEnabled: boolean): string => {
  return isEnabled ? java : lightGray;
};

export const sliderMinimum = (dark: boolean): string => {
  return dark ? white : black;
};

export const sliderMaximum = (dark: boolean): string => {
  return dark ? lightGray : goldenSand;
};

export const genericBorder = (dark: boolean): StyleProp<ViewStyle> => {
  return dark ? appStyles.genericBorderDark : appStyles.genericBorderLight;
};

export const appStyles = StyleSheet.create({
  secondaryBackgroundDark: {
    backgroundColor: darkestGray,
  },
  secondaryBackgroundLight: {
    backgroundColor: burntSienna,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,

    elevation: 2,
  },
  buttonBorderLight: {
    borderColor: black,
    borderWidth: 1,
  },
  buttonBorderDark: {
    borderColor: darkGray,
    borderWidth: 1,
  },
  squareButtonWrapper: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  genericBorderLight: {
    borderColor: black,
    borderWidth: 1,
  },
  genericBorderDark: {
    borderColor: darkGray,
    borderWidth: 1,
  },
  padding: {
    padding: 10,
  },
  verticalPadding: { paddingTop: 10, paddingBottom: 10 },
  card: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
