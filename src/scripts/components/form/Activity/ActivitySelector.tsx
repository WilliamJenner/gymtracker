import { Activity } from "@customTypes/index";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";

interface IActivitySelectorProps {
  activites?: Array<Activity>;
  selectedActivityId?: string;
  onValueChange: (activityId: string) => void;
}

const ActivitySelector = ({
  activites,
  selectedActivityId,
  onValueChange,
}: IActivitySelectorProps) => {
  // if there is only one activity auto select it
  React.useEffect(() => {
    if (activites && activites.length === 1) {
      onValueChange(activites[0].id);
    }
  }, [activites]);

  return (
    <Picker
      selectedValue={selectedActivityId}
      onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
      style={styles.picker}
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
