import { Activity, Exercise } from "@customTypes/index";
import { plateRound } from "@utils/number";
import React from "react";

interface IUseIntensity {
  getWeightToLift: (exercise: Exercise) => number;
}

export type OneRepMax = {
  activity: Activity;
  max: number;
};

const useIntensity = (): IUseIntensity => {
  /**
   * Gets the weight (in kg) to lift for a certain exercise
   * by calculating one rep max by intensity, and rounding to a figure achieveable with gym plates
   */
  const getWeightToLift = React.useCallback((exercise: Exercise) => {
    return plateRound(exercise.activity.oneRepMax * (exercise.intensity / 100));
  }, []);

  return { getWeightToLift };
};

export default useIntensity;
