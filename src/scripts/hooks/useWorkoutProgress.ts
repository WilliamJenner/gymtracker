import { GymSet, Workout } from "@customTypes/index";
import * as React from "react";
import { useInterval } from "./useInterval";

interface IUseWorkoutProgress {
  currentSet: GymSet;
  timeRested: number;
  resting: boolean;
  setsDone: number;
  nextExercise: () => void;
  previousExercise: () => void;
  nextSet: () => void;
  previousSet: () => void;
  startResting: () => void;
  stopResting: () => void;
}

interface IUseWorkoutProgressParams {
  workout: Workout;
  defaultState: {
    currentSetIndex: number;
    timeRested: number;
    resting: boolean;
  };
}

const useWorkoutProgress = ({
  workout,
  defaultState,
}: IUseWorkoutProgressParams): IUseWorkoutProgress => {
  const [currentSetIndex, setCurrentSetIndex] = React.useState<number>(
    defaultState.currentSetIndex
  );
  const [timeRested, setTimeRested] = React.useState<number>(
    defaultState.timeRested
  );
  const [resting, setResting] = React.useState<boolean>(defaultState.resting);
  const [setsDone, setSetsDone] = React.useState<number>(0);

  useInterval(() => {
    if (resting) {
      setTimeRested(timeRested + 1);
    }
  }, 1000);

  const currentSet = workout.sets[currentSetIndex];

  const nextExercise = () => {
    setCurrentSetIndex(
      currentSetIndex < workout.sets.length - 1
        ? currentSetIndex + 1
        : currentSetIndex
    ); // increment, unless that brings us above steps max index
    setSetsDone(0);
  };
  const previousExercise = () => {
    setCurrentSetIndex(
      currentSetIndex === 0 ? currentSetIndex : currentSetIndex - 1
    ); // increment, unless that brings us below steps 0
    setSetsDone(0);
  };

  const nextSet = () => {
    setSetsDone(setsDone < currentSet?.reps ? setsDone + 1 : setsDone); // increment, unless that brings us above steps
  };

  const previousSet = () => {
    setSetsDone(setsDone === 0 ? setsDone : setsDone - 1); // increment, unless that brings us below steps 0
  };

  const startResting = () => {
    setResting(true);
    setTimeRested(0);
  };
  const stopResting = () => {
    setResting(false);
    setTimeRested(0);
  };

  return {
    currentSet,
    timeRested,
    resting,
    setsDone,
    nextExercise,
    previousExercise,
    nextSet,
    previousSet,
    startResting,
    stopResting,
  };
};

export default useWorkoutProgress;
