import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import useStorage from "@hooks/useStorage";
import * as React from "react";
import { Button, KeyboardAvoidingView, ScrollView, View } from "react-native";
import ActivityEntry from "./ActivityEntry";
import { Text } from "./Themed";

const Activites = () => {
  const { data, saveData } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Button
          title="Clear storage"
          onPress={() => {
            saveData([]);
          }}
        />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ActivityEntry
            onSubmit={(value) => {
              console.log(value);
              if (data) {
                saveData([...data, value]);
              } else {
                saveData([value]);
              }
            }}
          />
        </KeyboardAvoidingView>

        <View style={{ flex: 1 }}>
          {data?.map((activity) => {
            return (
              <View key={activity.name + activity.description}>
                <Text>{activity.name}</Text>
                <Text>{activity.description}</Text>
                <Text>{activity.muscleGroup}</Text>
                <Button
                  title={"DELETE"}
                  onPress={() => {
                    saveData([
                      ...data.filter((value) => {
                        return (
                          value.name === activity.name &&
                          value.description === activity.description &&
                          value.muscleGroup === activity.muscleGroup
                        );
                      }),
                    ]);
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Activites;
