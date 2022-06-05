import { StorageKeys } from "@constants/StorageKeys";
import { OneRepMax } from "@hooks/useIntensity";
import useStorage from "@hooks/useStorage";
import { white } from "@styles/appStyles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Activity, MuscleGroup } from "../types/index";
import ActivitySelector from "./form/Activity/ActivitySelector";
import TextField from "./form/Common/TextField";

interface IOneRepMaxBuilderProps {
  onSubmit: (data: OneRepMax) => void;
}

export default function OneRepMaxBuilder({ onSubmit }: IOneRepMaxBuilderProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OneRepMax>({
    defaultValues: {
      activity: { name: "", description: "", muscleGroup: MuscleGroup.BACK },
      max: 0,
    },
  });

  const { data: activites } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const watchActivity = watch("activity");

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <ActivitySelector
            activites={activites}
            selectedActivity={watchActivity}
            cardStyle={(pressed, pressedItem) => {
              return {
                backgroundColor: pressed
                  ? "green"
                  : watchActivity?.name === pressedItem.name
                  ? "red"
                  : "blue",
                ...styles.activityCard,
              };
            }}
            onPress={(pressedItem) => {
              setValue("activity", pressedItem);
            }}
          />
        )}
        name="activity"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextField
            viewProps={{ style: styles.textField }}
            labelProps={{
              style: styles.label,
            }}
            labelText={`${name} (kg)`}
            inputProps={{
              onBlur: onBlur,
              onChangeText: (text) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
              style: styles.input,
            }}
          />
        )}
        name="max"
      />
      {errors.max && <Text>This is required.</Text>}

      <Button
        title={"Submit"}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    borderWidth: 1,
  },
});
