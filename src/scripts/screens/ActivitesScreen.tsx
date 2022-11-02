import { Text, View } from "@components/common/Themed";
import useActivites from "@hooks/query/useActivitIes";
import useOneRepMax from "@hooks/query/useOneRepMax";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ActivitesScreen({}) {
  const { activities } = useActivites({});
  const { oneRepMaxes } = useOneRepMax();

  console.log(oneRepMaxes.data);

  const selectedActivites = React.useMemo(() => {
    return oneRepMaxes.data?.map((orm) => {
      const activity = activities.data?.find(
        (activity) => activity.id === orm.activity.id
      );

      if (activity) {
        return {
          oneRepMax: orm.value,
          activity: activity,
        };
      }
    });
  }, [oneRepMaxes.data, activities.data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* <ActivitySelector
            onValueChange={() => {}}
            activites={activities?.data}
          /> */}

          {selectedActivites?.map((e) => {
            return (
              <>
                <Text>{e?.activity.name}</Text>
                <Text>{e?.oneRepMax}</Text>
              </>
            );
          })}
        </View>
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
