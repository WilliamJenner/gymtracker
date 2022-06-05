import ActivityEntry from "@components/form/Activity/ActivityEntry";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import useStorage from "@hooks/useStorage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Activity, RootStackParamList } from "../../../types/index";

interface EditActivityScreenProps
  extends NativeStackScreenProps<RootStackParamList, "EditActivity"> {}

export const EditActivityScreen = ({
  route,
  navigation,
}: EditActivityScreenProps) => {
  const { data, editData } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const { activity } = route.params;

  console.log(data, activity);

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ActivityEntry
        viewProps={{
          style: [styles.activityEntry],
        }}
        onSubmit={(value) => {
          editData(value, (value) => {
            return (
              value.name === activity.name &&
              value.muscleGroup === activity.muscleGroup
            );
          });

          navigation.goBack();
        }}
        defaultValues={activity}
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
