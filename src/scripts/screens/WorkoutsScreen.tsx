import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export default function WorkoutsScreen() {
  // const { data: oneRepMaxes, saveData: saveOneRepMaxes } =
  //   useStorage<OneRepMax>({
  //     key: StorageKeys.OneRepMax,
  //   });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="Clear storage" onPress={() => {}} />
        {/* <OneRepMaxBuilder
          onSubmit={(data) => {
            if (oneRepMaxes) {
              saveOneRepMaxes([...oneRepMaxes, data]);
            } else {
              saveOneRepMaxes([data]);
            }
          }}
        /> */}

        {/* <View style={{ flex: 1 }}>
          {oneRepMaxes?.map((oneRepMax) => {
            return (
              <View key={oneRepMax.activity.name + oneRepMax.max}>
                <Text>{oneRepMax.activity.name}</Text>
                <Text>{oneRepMax.max} kg</Text>
                <Button
                  title={"DELETE"}
                  onPress={() => {
                    saveOneRepMaxes([
                      ...oneRepMaxes.filter((value) => {
                        return (
                          value.activity.name === oneRepMax.activity.name &&
                          value.activity.description ===
                            oneRepMax.activity.description &&
                          value.activity.muscleGroup ===
                            oneRepMax.activity.muscleGroup &&
                          value.max === oneRepMax.max
                        );
                      }),
                    ]);
                  }}
                />
              </View>
            );
          })}
        </View> */}
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
