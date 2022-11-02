import { StorageKeys } from "@constants/StorageKeys";
import { Exercise, GymSet, GymSetDto } from "@customTypes/index";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import useExercise from "./useExercise";

interface IUseGymSet {
  gymSets: UseQueryResult<Array<GymSet>, Error>;
  saveGymSets: UseMutationResult<
    string[] | undefined,
    unknown,
    GymSetDto[],
    unknown
  >;
  deleteGymSet: UseMutationResult<void, Error, GymSet, unknown>;
}

/**
 *
 * @returns exercisesAndActivites an object where the document ref for activity has already been populated
 */
const useGymSet = (): IUseGymSet => {
  const {
    getDataWithId: getData,
    getDocument,
    saveData,
    deleteData,
  } = useFirebaseFirestore<GymSet>({
    collectionKey: StorageKeys.GymSets,
  });

  const { auth, isLoggedIn } = FirebaseAuthContainer.useContainer();
  const { exercises, saveExercise } = useExercise();

  const gymSets = useQuery<Array<GymSet>, Error>(
    [StorageKeys.GymSets],
    getData
  );

  const { getDocumentRef: getExerciseRef } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  const addGymSet = async (gymSetDto: GymSetDto): Promise<string> => {
    // save the included exercise
    console.log("adding exercise");

    let exerciseId = await saveExercise.mutateAsync(gymSetDto.exercise);

    console.log("EXERCISES");
    console.log(exerciseId, exercises);
    console.log("EXERCISES");

    if (exerciseId) {
      const exerciseDoc = getExerciseRef(exerciseId);

      // save gym set with new exercise ref and user id
      const gymSetDoc: GymSet = {
        userId: auth.currentUser?.uid,
        exercise: exerciseDoc,
        sets: gymSetDto.sets,
      };

      return saveData(gymSetDoc);
    } else {
      throw new Error("Could not find exerciseid");
    }
  };

  const saveGymSets = useMutation<
    string[] | undefined,
    unknown,
    GymSetDto[],
    unknown
  >(async (gymSetDtos: GymSetDto[]) => {
    console.log("saving gym sets");
    console.log(gymSetDtos);

    if (isLoggedIn && gymSetDtos.length > 0) {
      const addedSets = [];

      for (const gymSetDto of gymSetDtos) {
        let newSet = await addGymSet(gymSetDto);
        addedSets.push(newSet);
      }

      await gymSets.refetch();

      return addedSets;
    }
  });

  const deleteGymSet = useMutation<void, Error, GymSet, unknown>(
    async (gymSetDoc) => {
      if (isLoggedIn) {
        await deleteData(gymSetDoc);
        await gymSets.refetch();
      }
    }
  );

  return {
    gymSets,
    saveGymSets,
    deleteGymSet,
  };
};

export default useGymSet;
