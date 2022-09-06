import { StorageKeys } from "@constants/StorageKeys";
import { Workout } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface IUseWorkout {
  workouts: UseQueryResult<Array<Workout>, Error>;
}

const useWorkout = (): IUseWorkout => {
  const { getData: getData } = useFirebaseFirestore<Workout>({
    collectionKey: StorageKeys.Workouts,
  });
  const workout = useQuery<Array<Workout>, Error>(
    [StorageKeys.Workouts],
    getData
  );

  return {
    workouts: workout,
  };
};

export default useWorkout;
