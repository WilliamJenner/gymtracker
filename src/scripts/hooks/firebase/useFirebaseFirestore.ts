import { StorageKeys } from "@constants/StorageKeys";
import { StorageMetadata } from "@customTypes/app-types";
import useUuid from "@hooks/useUuid";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
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
  getDataWithId: () => Promise<TData[]>;
  getData: () => Promise<TData[]>;
  saveData: (data: TData) => Promise<void>;
  updateData: (data: TData) => Promise<void>;
  getDocument: <TDoc extends DocumentData>(
    document: DocumentReference<TDoc>
  ) => Promise<TDoc>;
  getDocumentRef: (data: TData) => DocumentReference<TData>;
  deleteData: (data: TData) => Promise<void>;
  queryForDoc: <TData extends StorageMetadata>(
    data: TData
  ) => Promise<DocumentSnapshot<DocumentData>>;
}

export const useFirebaseFirestore = <TData extends StorageMetadata>({
  collectionKey,
}: IUseFirebaseFirestoreParams): IUseFirebaseFirestore<TData> => {
  const { app, auth } = FirebaseAuthContainer.useContainer();
  const { generate } = useUuid();

  const firestore = getFirestore(app);
  const ref = collection(firestore, collectionKey);

  const queryForDoc = async <TData extends StorageMetadata>(data: TData) => {
    const document = getDoc(doc(ref, data.id));
    return document;
  };

  // sets user id of data to current user
  const processData = (data: TData) => {
    data.userId = auth.currentUser?.uid ?? "ERRORNOUID";
    return data;
  };

  const getDataWithId = async (): Promise<TData[]> => {
    const q = query(ref, where("userId", "==", auth.currentUser?.uid));
    const docs = await getDocs(q);
    const data = docs.docs.map((d) => {
      return { id: d.id, ...d.data() } as TData;
    });
    return data;
  };

  const getData = async (): Promise<TData[]> => {
    const q = query(ref);
    const docs = await getDocs(q);
    const data = docs.docs.map((d) => {
      return { id: d.id, ...d.data() } as TData;
    });

    return data;
  };

  const saveData = async (data: TData): Promise<void> => {
    data = processData(data);
    const id = data.id ? data.id : generate();
    setDoc(doc(firestore, collectionKey, id), data);
  };

  const updateData = async (data: TData): Promise<void> => {
    const document = await queryForDoc<TData>(data);
    updateDoc(document.ref, data);
  };

  const deleteData = async (data: TData): Promise<void> => {
    const document = await queryForDoc<TData>(data);
    deleteDoc(document.ref);
  };

  const getDocument = async <TDoc extends DocumentData>(
    document: DocumentReference<TDoc>
  ): Promise<TDoc> => {
    const doc = await getDoc(document);
    return doc.data() as TDoc;
  };

  const getDocumentRef = (data: TData): DocumentReference<TData> => {
    const docRef = doc(firestore, collectionKey, data.id ?? "");
    return docRef as DocumentReference<TData>;
  };

  return {
    getDataWithId,
    getData,
    saveData,
    updateData,
    getDocument,
    getDocumentRef,
    deleteData,
    queryForDoc,
  };
};
