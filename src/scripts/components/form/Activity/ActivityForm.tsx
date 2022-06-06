import { View, ViewProps } from "@components/Themed";
import { Picker } from "@react-native-picker/picker";
import { white } from "@styles/appStyles";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { Activity, MuscleGroup } from "../../../types/index";
import { ThemedPicker, ThemedTextField } from "../Common/ThemedFormFields";

interface IActivityEntryProps {
  onSubmit: SubmitHandler<Activity>;
  viewProps?: ViewProps;
  defaultValues: Activity;
}

export default function ActivityForm({
  viewProps,
  onSubmit,
  defaultValues,
}: IActivityEntryProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Activity>({
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
            validationLabelText={errors?.name?.message}
          />
        )}
        name="name"
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
            }}
            validationLabelText={errors?.description?.message}
          />
        )}
        name="description"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedPicker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
            labelText="Muscle Group"
          >
            {Object.values(MuscleGroup).map((group: string | MuscleGroup) => {
              if (typeof group === "string") {
                return <Picker.Item label={group} value={group} key={group} />;
              }
            })}
          </ThemedPicker>
        )}
        name={"muscleGroup"}
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
              onChangeText: (text) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.oneRepMax?.message}
          />
        )}
        name="oneRepMax"
      />

      <View style={styles.button}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    borderWidth: 1,
  },
});
