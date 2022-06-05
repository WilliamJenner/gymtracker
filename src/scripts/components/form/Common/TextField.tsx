import * as React from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import { Text, TextProps } from "../../Themed";

export interface ITextFieldProps {
  viewProps?: ViewProps;
  labelProps?: TextProps;
  labelText?: string;
  inputProps?: TextInputProps;
  validationLabelProps?: TextProps;
  validationLabelText?: string;
}

const TextField = ({
  viewProps,
  labelProps,
  labelText,
  inputProps,
  validationLabelProps,
  validationLabelText,
}: ITextFieldProps) => {
  return (
    <View {...viewProps}>
      <Text {...labelProps}>{labelText}</Text>
      <TextInput {...inputProps} />
      {validationLabelText && (
        <Text {...validationLabelProps}>{validationLabelText}</Text>
      )}
    </View>
  );
};

export default TextField;
