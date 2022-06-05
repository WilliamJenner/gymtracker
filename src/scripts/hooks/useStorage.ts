import { GetData, StoreData } from "@utils/storage/storage";
import * as React from "react";

interface IUseStorage<TData> {
  data?: Array<TData>;
  //   getData: () => Promise<TData[] | null>;
  saveData: (value: Array<TData>) => Promise<void>;
  //   removeData: (key: Array<string>) => Promise<void>;
}

interface IUseStorageParams {
  key: string;
}

const useStorage = <TData>({ key }: IUseStorageParams): IUseStorage<TData> => {
  const [data, setData] = React.useState<Array<TData>>();

  const getData = () => {
    return GetData<Array<TData>>(key);
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
    const storedData = await getData();
    if (storedData) {
      setData(storedData);
    }
  };

  const deleteData = async (value: TData) => {};

  React.useEffect(() => {
    getAndSetData();
  }, [key]);

  return {
    data,
    saveData,
  };
};

export default useStorage;
