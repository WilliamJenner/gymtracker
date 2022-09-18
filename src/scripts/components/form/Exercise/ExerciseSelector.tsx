import { StorageKeys } from "@constants/StorageKeys";
import { Activity, Exercise } from "@customTypes/index";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useIntensity from "@hooks/useIntensity";
import React from "react";
import { FlatList, Pressable, StyleProp, ViewStyle } from "react-native";

interface IExerciseSelectorProps {
  exercises?: Array<Exercise>;
  selectedActivity?: Exercise;
  cardStyle?: (pressed: boolean, pressedItem: Exercise) => StyleProp<ViewStyle>;
  onPress?: (pressedItem: Exercise) => void;
}

const ExerciseSelector = ({
  exercises,
  selectedActivity,
  cardStyle,
  onPress,
}: IExerciseSelectorProps) => {
  const {} = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
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
            {({ pressed }) => {}}
          </Pressable>
        );
      }}
      keyExtractor={(item: Exercise) => item.id}
    />
  );
};

export default ExerciseSelector;
