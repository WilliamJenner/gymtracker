import ExerciseSelector from "@components/form/Exercise/ExerciseSelector";
import Colors from "@constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import useExercise from "@hooks/query/useExercise";
import useWorkout from "@hooks/query/useWorkout";
import useColorScheme from "@hooks/useColorScheme";
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
import { View } from "../components/Themed";

export const WorkoutsScreen = () => {
  const { navigate } = useNavigation();

  const { workout } = useWorkout();

  const { exercise } = useExercise();

  const colorScheme = useColorScheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="Clear storage" onPress={() => {}} />

        <View style={{ flex: 1 }}>
          <FlatList
            data={exercise?.data}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View key={item?.id} style={[styles.workoutCard]}>
                  {exercise?.data && (
                    <ExerciseSelector
                      exercises={exercise?.data}
                      selectedActivity={exercise?.data[0]}
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
                    onPress={() => {}}
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
                    onPress={() => {}}
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
