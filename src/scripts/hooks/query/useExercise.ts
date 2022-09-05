import { StorageKeys } from "@constants/StorageKeys";
import { Exercise } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface IUseExercise {
  exercises: UseQueryResult<Array<Exercise>, Error>;
}

const useExercise = (): IUseExercise => {
  const { getData } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });
  const exercises = useQuery<Array<Exercise>, Error>(
    [StorageKeys.Exercises],
    getData
  );

  return {
    exercises,
  };
};

export default useExercise;
