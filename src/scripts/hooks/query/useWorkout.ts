import { StorageKeys } from "@constants/StorageKeys";
import { GymSet, Workout, WorkoutDto } from "@customTypes/index";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

interface IUseWorkout {
  workouts: UseQueryResult<Array<Workout>, Error>;
  saveWorkout: UseMutationResult<
    string | undefined,
    Error,
    WorkoutDto,
    unknown
  >;
}

const useWorkout = (): IUseWorkout => {
  const { getDataWithId: getData, saveData } = useFirebaseFirestore<Workout>({
    collectionKey: StorageKeys.Workouts,
  });

  const { auth, isLoggedIn } = FirebaseAuthContainer.useContainer();

  const { getDocumentRef: getGymSetRef } = useFirebaseFirestore<GymSet>({
    collectionKey: StorageKeys.GymSets,
  });

  const workouts = useQuery<Array<Workout>, Error>(
    [StorageKeys.Workouts],
    getData
  );

  // takes a new workout dto and saves each included DTO in firebase
  const saveWorkout = useMutation<
    string | undefined,
    Error,
    WorkoutDto,
    unknown
  >(async (workoutDto) => {
    console.log(isLoggedIn, workoutDto);

    if (isLoggedIn && workoutDto.sets && workoutDto.name) {
      // save the gym sets, get included refs

      console.log("saving gym sets");
      const addedSetsIds = await saveGymSets.mutateAsync(workoutDto.sets);

      console.log("saved gym sets, getting refs");
      // check for undefined
      if (addedSetsIds) {
        const gymSetRefs = addedSetsIds.map((set) => getGymSetRef(set));

        console.log("refs" + gymSetRefs.join(", "));
        const workoutDoc: Workout = {
          userId: auth.currentUser?.uid,
          sets: gymSetRefs,
          name: workoutDto.name,
        };

        // save workout
        console.log("saving ", workoutDoc);
        return saveData(workoutDoc);
      }

      await workouts.refetch();
    }
  });

  return {
    workouts,
    saveWorkout,
  };
};

export default useWorkout;
