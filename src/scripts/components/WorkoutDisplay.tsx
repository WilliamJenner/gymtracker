import { Exercise } from "@customTypes/index";
import { MockWorkout } from "@utils/mock";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { appStyles, charcoal } from "../styles/appStyles";

const renderExerciseItem = ({ item }: { item: Exercise }) => {
  return (
    <View style={styles.exerciseCard}>
      <Text style={styles.title}>{item.activity.name}</Text>
      <Text>{item.reps} reps</Text>
      <Text>{item.intensity * 100}%</Text>
    </View>
  );
};

const WorkoutDisplay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout</Text>
      <FlatList
        data={MockWorkout.exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item: Exercise) => item.activity.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  exerciseCard: {
    margin: 10,
    backgroundColor: charcoal,
    ...appStyles.padding,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default WorkoutDisplay;
