import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const useUuid = () => {
  const generate = () => uuidv4();

  return { generate };
};

export default useUuid;
