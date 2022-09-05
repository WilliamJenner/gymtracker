import ActivityForm from "@components/form/Activity/ActivityForm";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useUuid from "@hooks/useUuid";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Activity, MuscleGroup } from "../../../types/index";

export default function AddActivityScreen() {
  const navigation = useNavigation();
  const { getData: getActivites, saveData: saveActivity } =
    useFirebaseFirestore<Activity>({
      collectionKey: StorageKeys.Activites,
    });
  const { generate } = useUuid();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ActivityForm
        viewProps={{
          style: [styles.activityEntry],
        }}
        onSubmit={(value) => {
          value.id = generate();

          saveActivity(value);

          navigation.goBack();
        }}
        defaultValues={{
          id: "0",
          name: "",
          description: "",
          muscleGroup: MuscleGroup.BACK,
          oneRepMax: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityEntry: {},
});
