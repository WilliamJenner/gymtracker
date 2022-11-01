import { plateRound } from "@utils/number";
import React from "react";

interface IUseIntensity {
  getWeightToLift: (oneRepMax: number | undefined, intensity: number) => number;
}

const useIntensity = (): IUseIntensity => {
  /**
   * Gets the weight (in kg) to lift for a certain exercise
   * by calculating one rep max by intensity, and rounding to a figure achieveable with gym plates
   */
  const getWeightToLift = React.useCallback(
    (oneRepMax: number | undefined, intensity: number) => {
      const max = oneRepMax === undefined ? 0 : oneRepMax;

      return plateRound(max * (intensity / 100));
    },
    []
  );

  return { getWeightToLift };
};

export default useIntensity;
