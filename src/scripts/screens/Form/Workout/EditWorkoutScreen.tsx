import { View } from "@components/common/Themed";
import WorkoutForm from "@components/Workout/WorkoutForm";
import { RootStackParamList } from "@customTypes/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";

interface EditActivityScreenProps
  extends NativeStackScreenProps<RootStackParamList, "EditWorkout"> {}

export const EditWorkoutScreen = ({
  route,
  navigation,
}: EditActivityScreenProps) => {
  // const { getDataWithId: getData, saveData } = useFirebaseFirestore<Workout>({
  //   collectionKey: StorageKeys.Workouts,
  // });

  // const { workout } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <WorkoutForm
        onSubmit={(data) => {
          navigation.goBack();
        }}
        defaultValues={{
          name: "test",
          sets: [
            {
              exercise: {
                activity: {
                  name: "test",
                  description: "",
                  muscleGroup: MuscleGroup.BACK,
                },
                restTime: 90,
                reps: 1,
                intensity: 100,
              },
              sets: 2,
            },
          ],
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
