import { Text, View } from "@components/common/Themed";
import { Activity, Exercise } from "@customTypes/";
import useActivites from "@hooks/query/useActivitIes";
import useExercise from "@hooks/query/useExercise";
import useOneRepMax from "@hooks/query/useOneRepMax";
import useIntensity from "@hooks/useIntensity";
import { useNavigation } from "@react-navigation/native";
import { DocumentReference } from "firebase/firestore";
import * as React from "react";
import { Button } from "react-native";

interface IExerciseTitleProps {
  exercise: Exercise;
}

const ExerciseTile = ({ exercise }: IExerciseTitleProps) => {
  const { navigate } = useNavigation();
  const { activity } = useActivites({
    ref: exercise.activity as DocumentReference<Activity>,
  });
  const { deleteExercise } = useExercise();

  const { oneRepMaxes } = useOneRepMax();

  const orm = React.useMemo(() => {
    return oneRepMaxes.data?.filter(
      (o) =>
        o.activity.id === (exercise.activity as DocumentReference<Activity>).id
    )[0];
  }, [oneRepMaxes.data, exercise.activity]);

  const { getWeightToLift } = useIntensity();

  return (
    <View key={exercise.id}>
      <Text>{activity.data?.name}</Text>
      <Text>{exercise.reps} reps</Text>
      <Text>{exercise.restTime} second rest</Text>
      <Text>{exercise.intensity}% intense</Text>
      <Text>{getWeightToLift(orm?.value, exercise.intensity)}kg</Text>
      <Button
        title={"Edit"}
        onPress={() => {
          navigate("EditExercise", { exercise });
        }}
      />
      <Button
        title={"DELETE"}
        onPress={() => {
          deleteExercise.mutate(exercise, {
            onSuccess(data, variables, context) {
              console.log("success");
            },
            onError(error, variables, context) {
              console.log(error);
            },
          });
        }}
      />
    </View>
  );
};

export default ExerciseTile;
