import WorkoutForm from "@components/form/Workout/WorkoutForm";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { RootStackParamList, Workout } from "../../../types/index";

interface EditActivityScreenProps
  extends NativeStackScreenProps<RootStackParamList, "EditWorkout"> {}

export const EditWorkoutScreen = ({
  route,
  navigation,
}: EditActivityScreenProps) => {
  const { getData, saveData } = useFirebaseFirestore<Workout>({
    collectionKey: StorageKeys.Workouts,
  });

  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <WorkoutForm
        onSubmit={(data) => {
          saveData(data);

          navigation.goBack();
        }}
        defaultValues={workout}
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
