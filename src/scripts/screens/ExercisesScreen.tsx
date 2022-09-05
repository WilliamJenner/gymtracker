import { Text, View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useExercise from "@hooks/query/useExercise";
import useIntensity from "@hooks/useIntensity";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { Activity } from "../types/index";

export default function ExercisesScreen({}) {
  const { navigate } = useNavigation();

  const { exercise: exercises } = useExercise();

  const { getData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const { getWeightToLift } = useIntensity();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {exercises.data?.map((exercise) => {
            return (
              <View key={exercise.id}>
                <Text>{exercise.reps} reps</Text>
                <Text>{exercise.restTime} second rest</Text>
                <Button
                  title={"Edit"}
                  onPress={() => {
                    navigate("EditExercise", { exercise });
                  }}
                />
                <Button title={"DELETE"} onPress={() => {}} />
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
