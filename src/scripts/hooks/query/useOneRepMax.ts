import { StorageKeys } from "@constants/StorageKeys";
import { Activity, OneRepMax } from "@customTypes/index";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { DocumentReference } from "firebase/firestore";

interface IUseOneRepMax {
  oneRepMaxes: UseQueryResult<OneRepMax[], Error>;
  saveOneRepMax: UseMutationResult<void, Error, OneRepMax, unknown>;
  deleteOneRepMax: UseMutationResult<void, Error, OneRepMax, unknown>;
}

const useOneRepMax = (): IUseOneRepMax => {
  const { isLoggedIn } = FirebaseAuthContainer.useContainer();

  const { getData, saveData, deleteData } = useFirebaseFirestore<OneRepMax>({
    collectionKey: StorageKeys.OneRepMax,
  });

  const { queryForDoc: queryForActivity } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const oneRepMaxes = useQuery<Array<OneRepMax>, Error>(
    [StorageKeys.OneRepMax],
    getData
  );

  const saveOneRepMax = useMutation<void, Error, OneRepMax, unknown>(
    async (oneRepMax) => {
      if (isLoggedIn && oneRepMax.activity) {
        oneRepMax.activity = (await queryForActivity(oneRepMax.activity))
          .ref as DocumentReference<Activity>;

        await saveData(oneRepMax);

        await oneRepMaxes.refetch();
      }
    }
  );

  const deleteOneRepMax = useMutation<void, Error, OneRepMax, unknown>(
    async (oneRepMax) => {
      if (isLoggedIn && oneRepMax.id) {
        await deleteData(oneRepMax);
        await oneRepMaxes.refetch();
      }
    }
  );

  return {
    oneRepMaxes,
    saveOneRepMax,
    deleteOneRepMax,
  };
};

export default useOneRepMax;
