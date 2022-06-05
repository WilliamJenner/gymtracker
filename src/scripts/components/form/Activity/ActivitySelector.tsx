import { Activity } from "@customTypes/index";
import React from "react";
import { FlatList, Pressable, StyleProp, ViewStyle } from "react-native";
import { Text, View } from "../../Themed";

interface IActivitySelectorProps {
  activites?: Array<Activity>;
  selectedActivity?: Activity;
  cardStyle?: (pressed: boolean, pressedItem: Activity) => StyleProp<ViewStyle>;
  onPress?: (pressedItem: Activity) => void;
}

const ActivitySelector = ({
  activites,
  selectedActivity,
  cardStyle,
  onPress,
}: IActivitySelectorProps) => {
  return (
    <FlatList
      data={activites}
      horizontal={true}
      renderItem={({ item }: { item: Activity }) => {
        return (
          <Pressable
            onPress={() => {
              onPress && onPress(item);
            }}
          >
            {({ pressed }) => {
              return (
                <View style={cardStyle && cardStyle(pressed, item)}>
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.muscleGroup}</Text>
                  <Text>{item.oneRepMax} ORM (kg)</Text>
                </View>
              );
            }}
          </Pressable>
        );
      }}
      keyExtractor={(item: Activity) =>
        item.name + item.description + item.muscleGroup
      }
    />
  );
};

export default ActivitySelector;
