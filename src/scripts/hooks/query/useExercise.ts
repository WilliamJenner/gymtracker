import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Exercise, ExerciseDto } from "@customTypes/index";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

interface IUseExercise {
  exercises: UseQueryResult<Array<Exercise>, Error>;
  saveExercise: UseMutationResult<
    string | undefined,
    unknown,
    ExerciseDto,
    unknown
  >;
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

  const exercises = useQuery<Array<Exercise>, Error>(
    [StorageKeys.Exercises],
    getData
  );

  const saveExercise = useMutation(async (exerciseDto: ExerciseDto) => {
    if (isLoggedIn && exerciseDto.activity) {
      const activityRef = getActivityRef(exerciseDto.activity.id ?? "");

      delete exerciseDto.activity;

      const exerciseDoc: Exercise = {
        ...exerciseDto,
        activity: activityRef,
        userId: auth.currentUser?.uid,
      };

      const id = await saveData(exerciseDoc);

      await exercises.refetch();

      return id;
    }
  });

  const deleteExercise = useMutation<void, Error, Exercise, unknown>(
    async (exerciseDoc) => {
      if (isLoggedIn) {
        console.log("deleting");
        await deleteData(exerciseDoc);
        await exercises.refetch();
      }
    }
  );

  return {
    exercises: exercises,
    saveExercise,
    deleteExercise,
  };
};

export default useExercise;
