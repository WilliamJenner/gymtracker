import ExerciseForm from "@components/form/Exercise/ExerciseForm";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Exercise, RootStackParamList } from "../../../types/index";

interface EditActivityScreenProps
  extends NativeStackScreenProps<RootStackParamList, "EditExercise"> {}

export const EditExerciseScreen = ({
  route,
  navigation,
}: EditActivityScreenProps) => {
  const { getDataWithId: getData, saveData } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ExerciseForm
        onSubmit={(data) => {
          saveData(data);

          navigation.goBack();
        }}
        defaultValues={exercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityEntry: {},
});
