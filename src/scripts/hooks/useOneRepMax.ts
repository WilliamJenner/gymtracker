import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import React from "react";
import useStorage from "./useStorage";

interface IUseOneRepMax {
  oneRepMax: OneRepMax;
}
interface IUseOneRepMaxParams {
  activity: Activity;
}

export type OneRepMax = {
  activity: Activity;
  max: number;
};

const useOneRepMax = ({ activity }: IUseOneRepMaxParams) => {
  const { data: oneRepMaxes } = useStorage<OneRepMax>({
    key: StorageKeys.OneRepMax,
  });

  const [oneRepMax, setOneRepMax] = React.useState<OneRepMax>();

  // Gets first value from data where data activity matches passed in activity
  React.useEffect(() => {
    const max = oneRepMaxes?.filter(
      (value) =>
        value.activity.description === activity.description &&
        value.activity.muscleGroup === activity.muscleGroup &&
        value.activity.name === activity.name
    )[0];

    if (max) {
      setOneRepMax(max);
    }
  }, [oneRepMaxes, activity]);

  return { oneRepMax };
};
