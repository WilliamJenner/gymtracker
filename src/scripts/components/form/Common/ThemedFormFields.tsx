import { Text, useThemeColor, View } from "@components/common/Themed";
import TextField, { ITextFieldProps } from "@components/form/common/TextField";
import { Picker, PickerProps } from "@react-native-picker/picker";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

interface IThemedTextField extends ITextFieldProps {
  lightColor?: string;
  darkColor?: string;
  labelText?: string;
}

export const ThemedTextField = (props: IThemedTextField) => {
  const color = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  const tint = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "tint"
  );

  const interactiveBackground = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "interactiveBackground"
  );

  return (
    <TextField
      viewProps={{ style: [styles.container], ...props.viewProps }}
      labelProps={{ style: [styles.label, { color }], ...props.labelProps }}
      labelText={props.labelText}
      inputProps={{
        style: [
          styles.input,
          {
            backgroundColor: interactiveBackground,
          },
        ],
        ...props.inputProps,
      }}
      validationLabelText={props.validationLabelText}
      validationLabelProps={{
        style: [styles.label, { color: tint }],
        ...props.labelProps,
      }}
    />
  );
};

interface IThemedPicker<T> extends PropsWithChildren<PickerProps<T>> {
  lightColor?: string;
  darkColor?: string;
  labelText?: string;
}

export const ThemedPicker = <T,>(props: IThemedPicker<T>) => {
  const color = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  const tint = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "tint"
  );

  const interactiveBackground = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "interactiveBackground"
  );

  return (
    <View style={[styles.container]}>
      {props.labelText && <Text style={styles.label}>{props.labelText}</Text>}
      <Picker
        style={[
          styles.picker,
          {
            backgroundColor: interactiveBackground,
          },
        ]}
        {...props}
      >
        {props.children}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
  },
  picker: {
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
  },
});
