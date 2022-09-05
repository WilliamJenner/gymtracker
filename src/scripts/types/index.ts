export type AppTheme = "light" | "dark";

export type StorageMetadata = {
  id: string;
};

export enum MuscleGroup {
  "BACK",
  "CHEST",
  "CORE",
  "LEGS",
  "SHOULDERS",
}

export type Activity = StorageMetadata & {
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  oneRepMax: number;
};

export type Exercise = StorageMetadata & {
  activityId: string;
  reps: number;
  intensity: number;
  restTime: number;
};

export type GymSet = StorageMetadata & {
  exerciseId: string;
  reps: number;
};

export type Workout = StorageMetadata & {
  sets: Array<GymSet>;
  name: string;
  date?: Date;
  length?: number;
};

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  User: undefined;
  AddActivity: undefined;
  EditActivity: {
    activity: Activity;
  };
  AddExercise: undefined;
  EditExercise: {
    exercise: Exercise;
  };
  AddWorkout: undefined;
  EditWorkout: {
    workout: Workout;
  };
  Modal: undefined;
  NotFound: undefined;
  WorkoutProgress: {
    workout: Workout;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Activites: undefined;
  User: undefined;
  Exercises: undefined;
  Workouts: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
