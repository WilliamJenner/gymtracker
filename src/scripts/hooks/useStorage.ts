import { StorageMetadata } from "@customTypes/index";
import { useFocusEffect } from "@react-navigation/native";
import { GetData, StoreData } from "@utils/storage/storage";
import * as React from "react";

interface IUseStorage<TData extends StorageMetadata> {
  data?: Array<TData>;
  //   getData: () => Promise<TData[] | null>;
  saveData: (value: Array<TData>) => Promise<void>;
  //   removeData: (key: Array<string>) => Promise<void>;
  editData: (
    value: TData,
    predicate: (
      value: TData,
      index: number,
      obj: TData[]
    ) => boolean | undefined
  ) => void;
  findData: (id: string) => TData | undefined;
}

interface IUseStorageParams {
  key: string;
}

const useStorage = <TData extends StorageMetadata>({
  key,
}: IUseStorageParams): IUseStorage<TData> => {
  const [data, setData] = React.useState<Array<TData>>();

  const getDataFromStorage = () => {
    return GetData<Array<TData>>(key);
  };

  const findData = (id: string) => {
    return data?.find((value) => value.id === id);
  };

  /**
   * Overwrites the value with given key
   * @param value
   */
  const saveData = async (value: Array<TData>) => {
    await StoreData<Array<TData>>(value, key);
    getAndSetData();
  };

  const getAndSetData = async () => {
    const storedData = await getDataFromStorage();
    if (storedData) {
      setData(storedData);
    }
  };

  const editData = (
    value: TData,
    predicate: (
      value: TData,
      index: number,
      obj: TData[]
    ) => boolean | undefined
  ) => {
    if (data) {
      const index = data?.findIndex(predicate);
      let overwrittenData = data.slice(); // copies array
      overwrittenData[index] = value;
      saveData(overwrittenData);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAndSetData();
      return () => {};
    }, [key])
  );

  return {
    data,
    saveData,
    editData,
    findData,
  };
};

export default useStorage;
