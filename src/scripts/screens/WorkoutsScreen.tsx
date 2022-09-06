import useWorkout from "@hooks/query/useWorkout";
import useColorScheme from "@hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";
import { java } from "@styles/appStyles";
import React from "react";
import { Button, FlatList, ScrollView, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export const WorkoutsScreen = () => {
  const { navigate } = useNavigation();

  const { workouts } = useWorkout();

  console.log(workouts.data);

  const colorScheme = useColorScheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="Clear storage" onPress={() => {}} />

        <View style={{ flex: 1 }}>
          <FlatList
            data={workouts?.data}
            horizontal={true}
            renderItem={({ item }) => {
              return <View key={item?.id} style={[styles.workoutCard]}></View>;
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
