import ExerciseForm from "@components/form/Exercise/ExerciseForm";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import useStorage from "@hooks/useStorage";
import useUuid from "@hooks/useUuid";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Exercise } from "../../../types/index";

export const AddExerciseScreen = () => {
  const navigation = useNavigation();
  const { data: exercises, saveData: saveExercises } = useStorage<Exercise>({
    key: StorageKeys.Exercises,
  });

  const { generate } = useUuid();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ExerciseForm
        onSubmit={(data) => {
          data.id = generate();

          if (exercises) {
            saveExercises([...exercises, data]);
          } else {
            saveExercises([data]);
          }

          navigation.goBack();
        }}
        defaultValues={{
          id: "",
          activityId: "",
          intensity: 10,
          reps: 1,
          restTime: 90,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityEntry: {},
});
