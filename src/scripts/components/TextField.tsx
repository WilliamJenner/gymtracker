import * as React from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import { Text, TextProps } from "./Themed";

interface ITextFieldProps {
  viewProps?: ViewProps;
  labelProps?: TextProps;
  labelText?: string;
  inputProps?: TextInputProps;
}

const TextField = ({
  viewProps,
  labelProps,
  inputProps,
  labelText,
}: ITextFieldProps) => {
  return (
    <View {...viewProps}>
      <Text {...labelProps}>{labelText}</Text>
      <TextInput {...inputProps} />
    </View>
  );
};

export default TextField;
