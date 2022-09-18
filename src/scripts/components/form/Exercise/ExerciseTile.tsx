import { Text, View } from "@components/Themed";
import { Activity, Exercise } from "@customTypes/index";
import useActivites from "@hooks/query/useActivitIes";
import useExercise from "@hooks/query/useExercise";
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

  return (
    <View key={exercise.id}>
      <Text>{exercise.reps} reps</Text>
      <Text>{exercise.restTime} second rest</Text>
      <Text>{activity.data?.name}</Text>
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
