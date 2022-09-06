import { StorageKeys } from "@constants/StorageKeys";
import { StorageMetadata } from "@customTypes/index";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseAuthContainer } from "./useFirebaseAuth";

interface IUseFirebaseFirestoreParams {
  collectionKey: StorageKeys;
}

interface IUseFirebaseFirestore<TData extends StorageMetadata> {
  // data?: Array<TData>;
  // //   getData: () => Promise<TData[] | null>;
  // saveData: (value: Array<TData>) => Promise<void>;
  // //   removeData: (key: Array<string>) => Promise<void>;
  // editData: (
  //   value: TData,
  //   predicate: (
  //     value: TData,
  //     index: number,
  //     obj: TData[]
  //   ) => boolean | undefined
  // ) => void;
  // findData: (id: string) => TData | undefined;
  getData: () => Promise<TData[]>;
  saveData: (data: TData) => Promise<void>;
  updateData: (data: TData) => Promise<void>;
  getDocument: <TDoc extends DocumentData>(
    document: DocumentReference<TDoc>
  ) => Promise<TDoc>;
}

export const useFirebaseFirestore = <TData extends StorageMetadata>({
  collectionKey,
}: IUseFirebaseFirestoreParams): IUseFirebaseFirestore<TData> => {
  const { app, auth } = FirebaseAuthContainer.useContainer();
  const firestore = getFirestore(app);
  const ref = collection(firestore, collectionKey);

  // sets user id of data to current user
  const processData = (data: TData) => {
    data.userId = auth.currentUser?.uid ?? "ERRORNOUID";
    return data;
  };

  const getData = async (): Promise<TData[]> => {
    const q = query(ref, where("userId", "==", auth.currentUser?.uid));
    const docs = await getDocs(q);
    const data = docs.docs.map((d) => {
      return { id: d.id, ...d.data() } as TData;
    });
    return data;
  };

  const saveData = async (data: TData): Promise<void> => {
    data = processData(data);
    return await setDoc(doc(firestore, collectionKey), data);
  };

  const updateData = async (data: TData): Promise<void> => {
    const q = query(ref, where("id", "==", data.id));
    const docs = await getDocs(q);
    const document = docs.docs[0].ref;
    return await updateDoc(document, data);
  };

  const getDocument = async <TDoc extends DocumentData>(
    document: DocumentReference<TDoc>
  ): Promise<TDoc> => {
    const doc = await getDoc(document);
    return doc.data() as TDoc;
  };

  return {
    getData: getData,
    saveData,
    updateData,
    getDocument,
  };
};
