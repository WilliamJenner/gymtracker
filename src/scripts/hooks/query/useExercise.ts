import { StorageKeys } from "@constants/StorageKeys";
import { Exercise } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface IUseExercise {
  exercise: UseQueryResult<Array<Exercise>, Error>;
}

const useExercise = (): IUseExercise => {
  const { getData } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });
  const exercise = useQuery<Array<Exercise>, Error>(["exercise"], getData);

  return {
    exercise,
  };
};

export default useExercise;
