import { View } from "@components/common/Themed";
import ExerciseTile from "@components/Exercise/ExerciseTile";
import useActivites from "@hooks/query/useActivitIes";
import useExercise from "@hooks/query/useExercise";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ExercisesScreen({}) {
  const { exercises: exercise } = useExercise();
  const {} = useActivites({});

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {exercise?.data?.map((e) => {
            return <ExerciseTile exercise={e} key={e.id} />;
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
