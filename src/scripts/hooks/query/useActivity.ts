import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface IUseExercise {
  activity: UseQueryResult<Array<Activity>, Error>;
}

const useActivity = (): IUseExercise => {
  const { getData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });
  const activity = useQuery<Array<Activity>, Error>(
    [StorageKeys.Activites],
    getData
  );

  return {
    activity,
  };
};

export default useActivity;
