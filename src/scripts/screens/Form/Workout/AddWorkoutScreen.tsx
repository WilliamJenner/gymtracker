import { View } from "@components/common/Themed";
import WorkoutForm from "@components/Workout/WorkoutForm";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useUuid from "@hooks/useUuid";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Workout } from "../../../types/app-types";

export default function AddWorkoutScreen() {
  const navigation = useNavigation();
  const { getDataWithId: workouts, saveData: saveWorkout } =
    useFirebaseFirestore<Workout>({
      collectionKey: StorageKeys.Workouts,
    });
  const { generate } = useUuid();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <WorkoutForm
        onSubmit={(data) => {
          data.id = generate();

          saveWorkout(data);

          navigation.goBack();
        }}
        defaultValues={{
          name: "New workout",
          id: "",
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
