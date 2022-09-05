import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { Activity, Exercise } from "../../../types/index";
import { View, ViewProps } from "../../Themed";
import ActivitySelector from "../Activity/ActivitySelector";
import { ThemedTextField } from "../Common/ThemedFormFields";

interface IExerciseBuilderProps {
  onSubmit: SubmitHandler<Exercise>;
  viewProps?: ViewProps;
  defaultValues: Exercise;
}

const ExerciseForm = ({
  onSubmit,
  viewProps,
  defaultValues,
}: IExerciseBuilderProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Exercise>({
    defaultValues: defaultValues,
  });

  const { getData: activites } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  return (
    <View style={styles.container} {...viewProps}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <ActivitySelector
            activites={activites}
            selectedActivity={activites?.find(
              (activty) => activty.id === watchActivity
            )}
            cardStyle={(pressed, pressedItem) => {
              return {
                backgroundColor: pressed
                  ? "green"
                  : watchActivity === pressedItem.id
                  ? "red"
                  : "blue",
                ...styles.activityCard,
              };
            }}
            onPress={(pressedItem) => {
              setValue("activityId", pressedItem.id);
            }}
          />
        )}
        name="activityId"
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
            validationLabelText={errors?.reps?.message}
          />
        )}
        name="reps"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
          max: { value: 100, message: "Max 100" },
          min: { value: 0, message: "Min 0" },
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
            validationLabelText={errors?.intensity?.message}
          />
        )}
        name="intensity"
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
            validationLabelText={errors?.restTime?.message}
          />
        )}
        name="restTime"
      />

      <Button
        title={"Submit"}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </View>
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

export default ExerciseForm;
