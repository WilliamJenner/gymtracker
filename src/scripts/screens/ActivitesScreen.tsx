import Activites from "@components/form/Activity/Activites";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function ActivitesScreen({
  navigation,
}: RootTabScreenProps<"Activites">) {
  return (
    <View style={styles.container}>
      <Activites />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "red",
  },
});
