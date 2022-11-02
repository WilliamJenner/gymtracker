import { Text, View } from "@components/common/Themed";
import { Activity, OneRepMax } from "@customTypes/";
import useActivites from "@hooks/query/useActivitIes";
import useOneRepMax from "@hooks/query/useOneRepMax";
import { useNavigation } from "@react-navigation/native";
import { DocumentReference } from "firebase/firestore";
import * as React from "react";
import { Button } from "react-native";

interface IOneRepMaxTileProps {
  oneRepMax: OneRepMax;
}

const OneRepMaxTile = ({ oneRepMax }: IOneRepMaxTileProps) => {
  const { navigate } = useNavigation();

  const { activity } = useActivites({
    ref: oneRepMax.activity as DocumentReference<Activity>,
  });

  const { deleteOneRepMax, saveOneRepMax } = useOneRepMax();

  return (
    <View key={oneRepMax.id}>
      <Text>{oneRepMax.value}kg</Text>
      <Text>{activity.data?.name}</Text>
      <Button
        title={"Edit"}
        onPress={() => {
          navigate("EditOneRepMax", { oneRepMax });
        }}
      />
      <Button
        title={"DELETE"}
        onPress={() => {
          deleteOneRepMax.mutate(oneRepMax, {
            onSuccess(data, variables, context) {
              console.log("success");
            },
            onError(error, variables, context) {
              console.log(error);
            },
          });
        }}
      />
    </View>
  );
};

export default OneRepMaxTile;
