import ExerciseBuilder from "@components/ExerciseBuilder";
import { StorageKeys } from "@constants/StorageKeys";
import { Exercise } from "@customTypes/index";
import useStorage from "@hooks/useStorage";
import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  const { data: exercises, saveData: saveExercises } = useStorage<Exercise>({
    key: StorageKeys.Exercises,
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <ExerciseBuilder
          onSubmit={(data) => {
            if (exercises) {
              saveExercises([...exercises, data]);
            } else {
              saveExercises([data]);
            }
          }}
        />

        <View style={{ flex: 1 }}>
          {exercises?.map((exercise) => {
            return (
              <View
                key={
                  exercise.activity.name + exercise.intensity + exercise.reps
                }
              >
                <Text>{exercise.activity.name}</Text>
                <Text>{exercise.intensity}% intense</Text>
                <Text>{exercise.reps} reps</Text>
                <Text>{exercise.restTime} second rest</Text>
                <Button
                  title={"DELETE"}
                  onPress={() => {
                    saveExercises([
                      ...exercises.filter((value) => {
                        return (
                          value.activity.name === exercise.activity.name &&
                          value.activity.description ===
                            exercise.activity.description &&
                          value.activity.muscleGroup ===
                            exercise.activity.muscleGroup &&
                          value.intensity === exercise.intensity &&
                          value.reps === exercise.reps
                        );
                      }),
                    ]);
                  }}
                />
              </View>
            );
          })}
        </View>
        {/* <WorkoutBuilder /> */}
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
