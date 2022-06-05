import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Workout } from "@customTypes/index";
import useStorage from "@hooks/useStorage";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "../components/Themed";

const WorkoutBuilder = () => {
  const { data: activites } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });
  const { data: workouts } = useStorage<Workout>({
    key: StorageKeys.Workouts,
  });

  console.log(activites);

  return (
    <ScrollView>
      <View style={styles.container}></View>
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
});

export default WorkoutBuilder;
