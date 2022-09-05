import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";
import { Exercise, GymSet } from "../../../types/index";
import { View, ViewProps } from "../../Themed";
import { ThemedTextField } from "../Common/ThemedFormFields";
import ExerciseSelector from "../Exercise/ExerciseSelector";

interface ISetsFormProps {
  onSubmit: SubmitHandler<GymSet>;
  viewProps?: ViewProps;
  defaultValues: GymSet;
}

const SetsForm = ({ onSubmit, viewProps, defaultValues }: ISetsFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GymSet>({
    defaultValues: defaultValues,
  });

  const { getData: exercises } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  return (
    <View style={styles.container} {...viewProps}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <ExerciseSelector
            exercises={exercises}
            selectedActivity={exercises?.find(
              (exercise) => exercise.id === watchExercise
            )}
            cardStyle={(pressed, pressedItem) => {
              return {
                backgroundColor: pressed
                  ? "green"
                  : watchExercise === pressedItem.id
                  ? "red"
                  : "blue",
                ...styles.activityCard,
              };
            }}
            onPress={(pressedItem) => {
              setValue("exerciseId", pressedItem.id);
            }}
          />
        )}
        name="exerciseId"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <ThemedTextField
            labelText={"How many sets?"}
            inputProps={{
              onBlur: onBlur,
              onChangeText: (text) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.reps?.message}
            viewProps={{ style: { marginTop: 0 } }}
          />
        )}
        name="reps"
      />

      <Button
        title={"Add set"}
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

export default SetsForm;
