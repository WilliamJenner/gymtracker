import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DocumentReference } from "firebase/firestore";

interface IUseExercise {
  activities: UseQueryResult<Array<Activity>, Error>;
  activity: UseQueryResult<Activity, Error>;
}

interface IUseExerciseParams {
  ref?: DocumentReference<Activity>;
}

const useActivites = (props: IUseExerciseParams): IUseExercise => {
  const { getData: getShallowData, getDocument } =
    useFirebaseFirestore<Activity>({
      collectionKey: StorageKeys.Activites,
    });

  const activities = useQuery<Array<Activity>, Error>(
    [StorageKeys.Activites],
    getShallowData
  );

  const fetchActivity = ({ queryKey }: any) => {
    const [_key, ref] = queryKey;

    const doc = getDocument<Activity>(ref);
    return doc;
  };

  const activity = useQuery<Activity, Error, Activity>(
    [StorageKeys.Activity, props?.ref],
    fetchActivity
  );

  return {
    activities,
    activity,
  };
};

export default useActivites;
