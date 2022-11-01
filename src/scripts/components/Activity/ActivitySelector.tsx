import { TextProps } from "@components/common/Themed";
import { Activity } from "@customTypes/app-types";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";

interface IActivitySelectorProps {
  activites?: Array<Activity>;
  selectedActivityId?: string;
  onValueChange: (activityId: string) => void;
  textProps?: TextProps;
}

const ActivitySelector = ({
  activites,
  selectedActivityId,
  onValueChange,
  textProps,
}: IActivitySelectorProps) => {
  // auto select first activity
  React.useEffect(() => {
    if (activites && activites.length > 0) {
      onValueChange(activites[0].id ?? activites[0].name);
    }
  }, [activites]);

  return (
    <Picker
      selectedValue={selectedActivityId}
      onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
      style={{ ...styles.picker, ...textProps }}
    >
      {activites?.map((activity) => {
        return (
          <Picker.Item
            key={activity.id}
            label={`${activity.name}, ${activity.muscleGroup}`}
            value={activity.id}
          />
        );
      })}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "white",
  },
});

export default ActivitySelector;
