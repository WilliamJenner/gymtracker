import ExerciseForm from "@components/form/Exercise/ExerciseForm";
import { View } from "@components/Themed";
import useExercise from "@hooks/query/useExercise";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

export const AddExerciseScreen = () => {
  const navigation = useNavigation();

  const { saveExercise } = useExercise();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ExerciseForm
        onSubmit={(data) => {
          saveExercise.mutate(data, {
            onSuccess: (data, variables, context) => {
              console.log("success");
              console.log(context);
              navigation.goBack();
            },
            onError: (error) => {
              console.log(error);
            },
          });
        }}
        defaultValues={{
          activity: undefined,
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
