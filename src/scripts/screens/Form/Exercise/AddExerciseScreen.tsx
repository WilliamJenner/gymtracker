import { View } from "@components/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import useStorage from "@hooks/useStorage";
import useUuid from "@hooks/useUuid";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Exercise } from "../../../types/index";

export const AddExerciseScreen = () => {
  const navigation = useNavigation();
  const { data, editData } = useStorage<Exercise>({
    key: StorageKeys.Exercises,
  });

  const { generate } = useUuid();

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityEntry: {},
});
