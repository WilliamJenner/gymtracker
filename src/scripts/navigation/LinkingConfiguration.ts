/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Activites: {
            screens: {
              Activites: "activites",
            },
          },
          Exercises: {
            screens: {
              Exercises: "exercises",
            },
          },
          Workouts: {
            screens: {
              Workouts: "workouts",
            },
          },
        },
      },
      AddActivity: "addActivity",
      EditActivity: "editActivity",
      AddExercise: "addExercise",
      EditExercise: "editExercise",
      AddWorkout: "addWorkout",
      EditWorkout: "editWorkout",
      NotFound: "*",
    },
  },
};

export default linking;
