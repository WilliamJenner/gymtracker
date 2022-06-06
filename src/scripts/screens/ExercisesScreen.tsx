import { Text, View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import useIntensity from "@hooks/useIntensity";
import useStorage from "@hooks/useStorage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Activity, Exercise } from "../types/index";

export default function ExercisesScreen({}) {
  const { navigate } = useNavigation();

  const { data: exercises, saveData: saveExercises } = useStorage<Exercise>({
    key: StorageKeys.Exercises,
  });

  const { findData: findActivity } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const { getWeightToLift } = useIntensity();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button
          title="Clear storage"
          onPress={() => {
            saveExercises([]);
          }}
        />

        <View style={{ flex: 1 }}>
          {exercises?.map((exercise) => {
            const activity = findActivity(exercise.activityId);

            return (
              <View key={exercise.id}>
                <Text>{activity?.name}</Text>
                <Text>
                  {exercise.intensity}% intense |{" "}
                  {getWeightToLift(
                    activity?.oneRepMax ?? 0,
                    exercise.intensity
                  )}{" "}
                  kg
                </Text>
                <Text>{exercise.reps} reps</Text>
                <Text>{exercise.restTime} second rest</Text>
                <Button
                  title={"Edit"}
                  onPress={() => {
                    navigate("EditExercise", { exercise });
                  }}
                />
                <Button
                  title={"DELETE"}
                  onPress={() => {
                    saveExercises([
                      ...exercises.filter((value) => {
                        return value.id !== exercise.id;
                      }),
                    ]);
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
