import { View } from "@components/common/Themed";
import { StorageKeys } from "@constants/StorageKeys";
import { Activity, RootStackParamList } from "@customTypes/app-types";
import { FontAwesome } from "@expo/vector-icons";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useActivites from "@hooks/query/useActivitIes";
import useColorScheme from "@hooks/useColorScheme";
import useIntensity from "@hooks/useIntensity";
import useWorkoutProgress from "@hooks/useWorkoutProgress";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Button, Pressable, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IWorkoutProgressScreenProps
  extends NativeStackScreenProps<RootStackParamList, "WorkoutProgress"> {}

const WorkoutProgressScreen = ({
  route,
  navigation,
}: IWorkoutProgressScreenProps) => {
  const { workout } = route.params;

  const { activities: activity } = useActivites({});
  const { getDataWithId: getData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const { getWeightToLift } = useIntensity();

  const colorScheme = useColorScheme();

  const {
    currentSet,
    timeRested,
    resting,
    setsDone,
    nextSet,
    previousSet,
    nextExercise,
    previousExercise,
    startResting,
    stopResting,
  } = useWorkoutProgress({
    workout: workout,
    defaultState: {
      currentSetIndex: 0,
      timeRested: 0,
      resting: false,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.currentSet]}>
        {/* <Text style={styles.header}>{currentActivity?.name}</Text>
        <Text>{currentExercise?.reps} reps</Text>
        <Text>
          {currentActivity &&
            currentExercise &&
            getWeightToLift(
              currentActivity?.oneRepMax,
              currentExercise?.intensity
            )}{" "}
          kg
        </Text>
        <Text>
          {setsDone} / {currentSet?.reps} sets
        </Text>

        <Text>
          {timeRested} / {currentExercise?.restTime} seconds
        </Text> */}
      </View>

      <View style={styles.buttons}>
        <Pressable
          onPress={() => {
            resting ? stopResting() : startResting();
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name={resting ? "pause" : "play"}
            size={50}
            style={{ marginRight: 15 }}
            color={Colors[colorScheme].text}
          />
        </Pressable>

        <Button
          title={"Next set"}
          onPress={() => {
            nextSet();
          }}
        />
        <Button
          title={"Previous set"}
          onPress={() => {
            previousSet();
          }}
        />

        <Button
          title={"Next exercise"}
          onPress={() => {
            nextExercise();
          }}
        />
        <Button
          title={"Previous exercise"}
          onPress={() => {
            previousExercise();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  currentSet: {
    backgroundColor: "red",
    width: "100%",
  },
  header: {
    fontSize: 30,
  },
  buttons: {
    backgroundColor: "green",
    marginVertical: 20,
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activityCard: {
    padding: 10,
    margin: 10,
  },
  textField: {
    width: "100%",
    borderWidth: 1,
    borderColor: "blue",
  },
  label: {
    alignSelf: "flex-start",
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    backgroundColor: white,
  },
  button: {
    margin: 12,
    borderWidth: 1,
  },
});

export default WorkoutProgressScreen;
