import { View } from "@components/common/Themed";
import { OneRepMaxForm } from "@components/OneRepMax/OneRepMaxForm";
import { Activity, OneRepMax } from "@customTypes/app-types";
import useOneRepMax from "@hooks/query/useOneRepMax";
import { useNavigation } from "@react-navigation/native";
import { DocumentReference } from "firebase/firestore";
import * as React from "react";
import { StyleSheet } from "react-native";

interface IAddOneRepMaxProps {}

const AddOneRepMax = (props: IAddOneRepMaxProps) => {
  const { saveOneRepMax } = useOneRepMax();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <OneRepMaxForm
        onSubmit={(data) => {
          saveOneRepMax.mutate(data as OneRepMax, {
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
        defaultValues={{
          activity: undefined as unknown as DocumentReference<Activity>,
          value: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddOneRepMax;
