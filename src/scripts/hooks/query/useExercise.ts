import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Exercise, ExerciseDto } from "@customTypes/app-types";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

interface IUseExercise {
  exercise: UseQueryResult<Array<Exercise>, Error>;
  saveExercise: UseMutationResult<void, Error, ExerciseDto, unknown>;
  deleteExercise: UseMutationResult<void, Error, Exercise, unknown>;
}

/**
 *
 * @returns exercisesAndActivites an object where the document ref for activity has already been populated
 */
const useExercise = (): IUseExercise => {
  const {
    getDataWithId: getData,
    getDocument,
    saveData,
    deleteData,
  } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  const { auth, isLoggedIn } = FirebaseAuthContainer.useContainer();

  const { getDocumentRef: getActivityRef } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const exercise = useQuery<Array<Exercise>, Error>(
    [StorageKeys.Exercises],
    getData
  );

  const saveExercise = useMutation<void, Error, ExerciseDto, unknown>(
    async (exerciseDto) => {
      if (isLoggedIn && exerciseDto.activity) {
        const activityRef = getActivityRef(exerciseDto?.activity);

        delete exerciseDto.activity;

        const exerciseDoc: Exercise = {
          ...exerciseDto,
          activity: activityRef,
          userId: auth.currentUser?.uid,
        };

        await saveData(exerciseDoc);

        await exercise.refetch();
      }
    }
  );

  const deleteExercise = useMutation<void, Error, Exercise, unknown>(
    async (exerciseDoc) => {
      if (isLoggedIn) {
        console.log("deleting");
        await deleteData(exerciseDoc);
        await exercise.refetch();
      }
    }
  );

  return {
    exercise,
    saveExercise,
    deleteExercise,
  };
};

export default useExercise;
