export type AppTheme = "light" | "dark";

export type StorageMetadata = {
  id?: string;
  userId?: string;
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
};

export type ExerciseDto = {
  activity?: Activity;
  id?: string;
  reps: number;
  intensity: number;
  restTime: number;
};

export type Exercise = StorageMetadata & {
  activity: DocumentReference<Activity> | string;
  reps: number;
  intensity: number;
  restTime: number;
};

export type GymSetDto = {
  exercise: ExerciseDto;
  reps: number;
};

export type GymSet = StorageMetadata & {
  exercise: DocumentReference<Exercise>;
  reps: number;
};

export type WorkoutDto = {
  sets: Array<GymSetDto>;
  name: string;
};

export type Workout = StorageMetadata & {
  sets: Array<DocumentReference<GymSet>>;
  name: string;
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
import { DocumentReference } from "firebase/firestore";

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
