import * as React from "react";

import { Text, View } from "@components/common/Themed";
import { GymSet } from "@customTypes/index";
import useExercise from "@hooks/query/useExercise";
import useGymSet from "@hooks/query/useGymSet";
import { DocumentReference } from "firebase/firestore";

interface ISetDisplayProps {
  gymSet: DocumentReference<GymSet>;
}

export const SetDisplay = (props: ISetDisplayProps) => {
  const { gymSets } = useGymSet();
  const { exercises } = useExercise();

  const gymSet = React.useMemo(() => {
    return gymSets.data?.find((s) => s.id === props.gymSet.id);
  }, [gymSets.data, props.gymSet]);

  console.log(gymSet);

  return (
    <View style={{ flex: 1 }}>
      <Text>sets {gymSet?.sets}</Text>
      <Text>exercise id {gymSet?.id}</Text>
    </View>
  );
};
