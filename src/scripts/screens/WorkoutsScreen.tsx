import ExerciseSelector from "@components/form/Exercise/ExerciseSelector";
import Colors from "@constants/Colors";
import { StorageKeys } from "@constants/StorageKeys";
import { Exercise, Workout } from "@customTypes/index";
import { FontAwesome } from "@expo/vector-icons";
import useColorScheme from "@hooks/useColorScheme";
import useStorage from "@hooks/useStorage";
import { useNavigation } from "@react-navigation/native";
import { java } from "@styles/appStyles";
import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, View } from "../components/Themed";

export const WorkoutsScreen = () => {
  const { navigate } = useNavigation();

  const {
    data: workouts,
    saveData,
    findData: findWorkout,
  } = useStorage<Workout>({
    key: StorageKeys.Workouts,
  });

  const { findData: findExercise } = useStorage<Exercise>({
    key: StorageKeys.Exercises,
  });

  const colorScheme = useColorScheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="Clear storage" onPress={() => {}} />

        <View style={{ flex: 1 }}>
          <FlatList
            data={workouts}
            horizontal={true}
            renderItem={({ item }) => {
              const selectedExercises = item.sets
                .map((set) => {
                  return findExercise(set.exerciseId);
                })
                .filter((value) => {
                  return value !== undefined;
                });

              console.log(selectedExercises);

              return (
                <View key={item?.id} style={[styles.workoutCard]}>
                  <Text>{item.name}</Text>
                  <Text>{item.id}</Text>
                  <Text>{item?.sets.length} sets</Text>

                  {selectedExercises && (
                    <ExerciseSelector
                      exercises={selectedExercises as Exercise[]}
                      selectedActivity={selectedExercises[0]}
                      cardStyle={(pressed, pressedItem) => {
                        return {
                          backgroundColor: pressed ? "green" : "blue",
                          ...styles.activityCard,
                        };
                      }}
                      onPress={(pressedItem) => {}}
                    />
                  )}

                  <Pressable
                    onPress={() => {
                      if (workouts) {
                        saveData([
                          ...workouts.filter(
                            (workout) => workout.id !== item.id
                          ),
                        ]);
                      }
                    }}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}
                  >
                    <FontAwesome
                      name="times"
                      size={25}
                      style={{ marginRight: 15 }}
                      color={Colors[colorScheme].text}
                    />
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      navigate("EditWorkout", { workout: item });
                    }}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}
                  >
                    <FontAwesome
                      name="edit"
                      size={25}
                      style={{ marginRight: 15 }}
                      color={Colors[colorScheme].text}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigate("WorkoutProgress", { workout: item });
                    }}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}
                  >
                    <FontAwesome
                      name="play"
                      size={25}
                      style={{ marginRight: 15 }}
                      color={Colors[colorScheme].text}
                    />
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  workoutCard: {
    margin: 10,
    padding: 10,
    backgroundColor: java,
  },
  activityCard: {
    padding: 10,
    marginVertical: 10,
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

export default WorkoutsScreen;
