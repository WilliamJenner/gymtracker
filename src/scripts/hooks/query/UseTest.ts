import { StorageKeys } from "@constants/StorageKeys";
import { StorageMetadata } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DocumentReference } from "firebase/firestore";

interface Test extends StorageMetadata {
  t: DocumentReference;
}

interface IUseExercise {
  test: UseQueryResult<Array<Test>, Error>;
}

const useTest = (): IUseExercise => {
  const { getData, getDocument } = useFirebaseFirestore<Test>({
    collectionKey: StorageKeys.test,
  });
  const test = useQuery<Array<Test>, Error>(["test"], getData);

  const doc = useQuery<any, Error>(["characters"], () => {
    return test?.data && getDocument(test.data[0].t);
  });

  return {
    test,
  };
};

export default useTest;
