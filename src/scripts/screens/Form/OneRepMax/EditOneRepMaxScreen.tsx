import { View } from "@components/common/Themed";
import { OneRepMaxForm } from "@components/OneRepMax/OneRepMaxForm";
import { Activity, OneRepMax, RootStackParamList } from "@customTypes/index";
import useOneRepMax from "@hooks/query/useOneRepMax";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DocumentReference } from "firebase/firestore";
import * as React from "react";
import { StyleSheet } from "react-native";

interface IEditOneRepMaxProps
  extends NativeStackScreenProps<RootStackParamList, "EditOneRepMax"> {}
{
}

const EditOneRepMax = ({ route }: IEditOneRepMaxProps) => {
  const { updateOneRepMax } = useOneRepMax();
  const navigation = useNavigation();

  const { oneRepMax } = route.params;

  return (
    <View style={styles.container}>
      <OneRepMaxForm
        onSubmit={(data) => {
          const mergedOneRepMax: OneRepMax = {
            id: oneRepMax.id,
            userId: oneRepMax.userId,
            activity: data.activity as unknown as DocumentReference<Activity>,
            value: data.value,
          };
          updateOneRepMax.mutate(mergedOneRepMax, {
            onSuccess: (data, variables, context) => {
              console.log("success");
              console.log(variables);
              navigation.goBack();
            },
            onError: (error) => {
              console.log(error);
            },
          });
        }}
        defaultValues={oneRepMax}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default EditOneRepMax;
