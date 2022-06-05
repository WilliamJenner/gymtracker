import { StorageKeys } from "@constants/StorageKeys";
import useStorage from "@hooks/useStorage";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Activity, Exercise, MuscleGroup, Workout } from "../../../types/index";
import { Text, View } from "../../Themed";
import ActivitySelector from "../Activity/ActivitySelector";
import TextField from "../Common/TextField";

interface IExerciseBuilderProps {
  onSubmit: (data: Exercise) => void;
}

const ExerciseBuilder = ({ onSubmit }: IExerciseBuilderProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Exercise>({
    defaultValues: {
      activity: { name: "", description: "", muscleGroup: MuscleGroup.BACK },
      reps: 0,
      intensity: 0.5,
      restTime: 90,
    },
  });

  const { data: activites } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });
  const { data: workouts } = useStorage<Workout>({
    key: StorageKeys.Workouts,
  });

  const watchActivity = watch("activity");

  return (
    <ScrollView>
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
              labelText={name}
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
          name="reps"
        />
        {errors.reps && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            max: { value: 100, message: "Max 100" },
            min: { value: 0, message: "Min 0" },
          }}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <TextField
              viewProps={{ style: styles.textField }}
              labelProps={{
                style: styles.label,
              }}
              labelText={name}
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
          name="intensity"
        />
        {errors.intensity && <Text>{errors.intensity.message}</Text>}

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
              labelText={name}
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
          name="restTime"
        />
        {errors.restTime && <Text>This is required.</Text>}

        <Button
          title={"Submit"}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </View>
    </ScrollView>
  );
};

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

export default ExerciseBuilder;
