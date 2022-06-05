import { Activity, MuscleGroup, Workout } from "../types/index";

export const OverheadPress: Activity = {
  name: "Overhead Press",
  description: "Pressing a barbell over the head, shoulder exercise",
  muscleGroup: MuscleGroup.SHOULDERS,
};

export const BenchPress: Activity = {
  name: "Bench Press",
  description: "Pressing a barbell over the head, shoulder exercise",
  muscleGroup: MuscleGroup.CHEST,
};

export const MockWorkout: Workout = {
  exercises: [
    {
      activity: OverheadPress,
      reps: 3,
      intensity: 0.7,
      restTime: 90,
    },
    {
      activity: BenchPress,
      reps: 5,
      intensity: 0.8,
      restTime: 90,
    },
  ],
  date: undefined,
  length: undefined,
};
