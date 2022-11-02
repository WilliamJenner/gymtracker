import { View } from "@components/common/Themed";
import WorkoutForm from "@components/Workout/WorkoutForm";
import useWorkout from "@hooks/query/useWorkout";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

export default function AddWorkoutScreen() {
  const navigation = useNavigation();
  const { saveWorkout } = useWorkout();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <WorkoutForm
        onSubmit={(data) => {
          navigation.goBack();
          console.log(data);
          console.log("submitting");
          saveWorkout.mutate(data, {
            onError(error, variables, context) {
              console.log(error);
            },
          });
        }}
        defaultValues={{
          name: "New workout",
          sets: [],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityEntry: {},
});
