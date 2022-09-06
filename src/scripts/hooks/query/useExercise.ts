import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Exercise } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type ExerciseAndActivity = {
  exercise: Exercise;
  activity: Activity;
};

interface IUseExercise {
  exercisesAndActivities: UseQueryResult<Array<ExerciseAndActivity>, Error>;
}

const useExercise = (): IUseExercise => {
  const { getData: getData, getDocument } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  const exercisesAndActivities = useQuery<Array<ExerciseAndActivity>, Error>(
    [StorageKeys.Exercises],
    async () => {
      const data = await getData();

      const exerciseAndActivity = data.map(async (d) => {
        return {
          exercise: d,
          activity: await getDocument<Activity>(d.activity),
        };
      });

      return await Promise.all(exerciseAndActivity);
    }
  );

  return {
    exercisesAndActivities,
  };
};

export default useExercise;
