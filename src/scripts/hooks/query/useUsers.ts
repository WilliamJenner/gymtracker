import { StorageMetadata } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface User extends StorageMetadata {
  score: number;
}

interface IUseUsers {
  users: UseQueryResult<Array<User>, Error>;
}

const useUsers = (): IUseUsers => {
  const { getData } = useFirebaseFirestore<User>({ collectionKey: "users" });
  const users = useQuery<Array<User>, Error>(["users"], getData);

  return { users };
};

export default useUsers;
