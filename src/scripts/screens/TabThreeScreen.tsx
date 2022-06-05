import OneRepMaxBuilder from "@components/OneRepMaxBuilder";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export default function TabThreeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <OneRepMaxBuilder onSubmit={(data) => console.log(data)} />
      </View>
    </ScrollView>
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
  },
});
