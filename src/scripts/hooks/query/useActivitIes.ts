import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface IUseExercise {
  activities: UseQueryResult<Array<Activity>, Error>;
}

const useActivites = (): IUseExercise => {
  const { getData: getShallowData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });
  const activities = useQuery<Array<Activity>, Error>(
    [StorageKeys.Activites],
    getShallowData
  );

  return {
    activities,
  };
};

export default useActivites;
