import { View, ViewProps } from "@components/common/Themed";
import { ThemedTextField } from "@components/form/common/ThemedFormFields";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";

type UsernamePassword = {
  username: string;
  password: string;
};

interface IUserNamePasswordFormProps {
  onSubmit: SubmitHandler<UsernamePassword>;
  viewProps?: ViewProps;
  defaultValues: UsernamePassword;
}

const UserNamePasswordForm = ({
  onSubmit,
  viewProps,
  defaultValues,
}: IUserNamePasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernamePassword>({
    defaultValues: defaultValues,
  });

  return (
    <View style={styles.container} {...viewProps}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <ThemedTextField
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: onChange,
              value: value,
            }}
            validationLabelText={errors?.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <ThemedTextField
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: onChange,
              value: value,
              textContentType: "password",
              secureTextEntry: true,
            }}
            validationLabelText={errors?.password?.message}
          />
        )}
        name="password"
      />

      <View style={styles.button}>
        <Button
          title={"Submit"}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityCard: {
    padding: 10,
    margin: 10,
  },
  textField: {
    width: "100%",
    borderWidth: 1,
    borderColor: "blue",
  },
  label: {
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    backgroundColor: white,
  },
  button: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
});

export default UserNamePasswordForm;
