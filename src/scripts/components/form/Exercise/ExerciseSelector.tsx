import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Exercise } from "@customTypes/index";
import useIntensity from "@hooks/useIntensity";
import useStorage from "@hooks/useStorage";
import React from "react";
import { FlatList, Pressable, StyleProp, ViewStyle } from "react-native";
import { Text, View } from "../../Themed";

interface IExerciseSelectorProps {
  exercises?: Array<Exercise>;
  selectedActivity?: Exercise;
  cardStyle?: (pressed: boolean, pressedItem: Exercise) => StyleProp<ViewStyle>;
  onPress?: (pressedItem: Exercise) => void;
}

const ActivitySelector = ({
  exercises,
  selectedActivity,
  cardStyle,
  onPress,
}: IExerciseSelectorProps) => {
  const { findData: findActivity } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const { getWeightToLift } = useIntensity();

  return (
    <FlatList
      data={exercises}
      horizontal={true}
      renderItem={({ item }: { item: Exercise }) => {
        return (
          <Pressable
            onPress={() => {
              onPress && onPress(item);
            }}
          >
            {({ pressed }) => {
              const activity = findActivity(item.activityId);

              return (
                <View style={cardStyle && cardStyle(pressed, item)}>
                  <Text>{activity?.name}</Text>
                  <Text>
                    {item.intensity}% intense |{" "}
                    {getWeightToLift(activity?.oneRepMax ?? 0, item.intensity)}{" "}
                    kg
                  </Text>
                  <Text>{item.reps} reps</Text>
                  <Text>{item.restTime} rest time</Text>
                </View>
              );
            }}
          </Pressable>
        );
      }}
      keyExtractor={(item: Exercise) => item.id}
    />
  );
};

export default ActivitySelector;
