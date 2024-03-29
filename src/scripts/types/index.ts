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

declare type AppTheme = "light" | "dark";

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
  sets: number;
};

export type GymSet = StorageMetadata & {
  exercise: DocumentReference<Exercise>;
  sets: number;
};

export type WorkoutDto = {
  sets: Array<GymSetDto>;
  name: string;
};

export type Workout = StorageMetadata & {
  sets: Array<DocumentReference<GymSet>>;
  name: string;
};

export type OneRepMaxDto = {
  activity: Activity;
  value: number;
};

export type OneRepMax = StorageMetadata & {
  activity: DocumentReference<Activity>;
  value: number;
};

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
  AddOneRepMax: undefined;
  EditOneRepMax: {
    oneRepMax: OneRepMax;
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

export interface User {
  apiKey: string;
  appName: string;
  authDomain: string;
  createdAt: string;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  multiFactor: MultiFactor;
  phoneNumber?: string;
  photoURL?: string;
  providerData?: ProviderDataEntity[];
  redirectEventId?: string;
  stsTokenManager: StsTokenManager;
  tenantId?: string;
  uid: string;
}

export interface MultiFactor {
  enrolledFactors?: string[] | string;
}

export interface ProviderDataEntity {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId: string;
  uid: string;
}

export interface StsTokenManager {
  accessToken: string;
  apiKey: string;
  expirationTime: number;
  refreshToken: string;
}

export type FirestoreCollection = "users";
