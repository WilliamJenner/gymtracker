import { StorageKeys } from "@constants/StorageKeys";
import { Activity } from "@customTypes/index";
import useStorage from "@hooks/useStorage";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, ScrollView, View } from "react-native";
import { Text } from "../../Themed";

const Activites = () => {
  const { data, saveData } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const { navigate } = useNavigation();

  return (
    <ScrollView>
      <View>
        <Button
          title="Clear storage"
          onPress={() => {
            saveData([]);
          }}
        />

        <View>
          {data?.map((activity) => {
            return (
              <View key={activity.name + activity.description}>
                <Text>{activity.name}</Text>
                <Text>{activity.description}</Text>
                <Text>{activity.muscleGroup}</Text>
                <Text>{activity.oneRepMax}</Text>
                <Text>{activity.id}</Text>
                <Button
                  title={"Edit"}
                  onPress={() => {
                    navigate("EditActivity", { activity });
                  }}
                />
                <Button
                  title={"DELETE"}
                  onPress={() => {
                    saveData([
                      ...data.filter((value) => {
                        return value.id === activity.id;
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
