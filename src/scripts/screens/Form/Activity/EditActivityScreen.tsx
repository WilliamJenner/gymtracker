import ActivityForm from "@components/form/Activity/ActivityForm";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
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
  const { updateData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const { activity } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <ActivityForm
        viewProps={{
          style: [styles.activityEntry],
        }}
        onSubmit={(value) => {
          updateData(value);
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
