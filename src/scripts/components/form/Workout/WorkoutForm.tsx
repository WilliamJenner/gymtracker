import Colors from "@constants/Colors";
import { StorageKeys } from "@constants/StorageKeys";
import { FontAwesome } from "@expo/vector-icons";
import { useFirebaseFirestore } from "@hooks/firebase/useFirebaseFirestore";
import useColorScheme from "@hooks/useColorScheme";
import useUuid from "@hooks/useUuid";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, FlatList, Pressable, StyleSheet } from "react-native";
import { Activity, Exercise, Workout } from "../../../types/index";
import { Text, View, ViewProps } from "../../Themed";
import { ThemedTextField } from "../Common/ThemedFormFields";
import SetsForm from "./SetsForm";

interface IWorkoutFormProps {
  onSubmit: SubmitHandler<Workout>;
  viewProps?: ViewProps;
  defaultValues: Workout;
}

const WorkoutForm = ({
  onSubmit,
  viewProps,
  defaultValues,
}: IWorkoutFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Workout>({
    defaultValues: defaultValues,
  });

  const { getData: exercises } = useFirebaseFirestore<Exercise>({
    collectionKey: StorageKeys.Exercises,
  });

  const { getData: getData } = useFirebaseFirestore<Activity>({
    collectionKey: StorageKeys.Activites,
  });

  const { generate } = useUuid();

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container} {...viewProps}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <ThemedTextField
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: onChange,
              value: value,
            }}
            validationLabelText={errors?.name?.message}
          />
        )}
        name="name"
      />

      <SetsForm
        onSubmit={(gymSet) => {
          gymSet.id = generate();
          setValue("sets", [...watchSets, gymSet]);
        }}
        defaultValues={{ id: "", exerciseId: "", reps: 0 }}
        viewProps={{ style: { flex: 1 } }}
      />

      <FlatList
        data={watchSets}
        horizontal={true}
        renderItem={({ item }) => {
          const exercise = findExercise(item?.exerciseId);
          const activity = exercise && findActivity(exercise?.activityId);

          return (
            <View key={item?.id} style={[styles.activityCard, {}]}>
              <Text style={{}}>{activity?.name}</Text>
              <Text>{exercise?.intensity}</Text>
              <Text>{item?.reps} sets</Text>

              <Pressable
                onPress={() => {
                  setValue(
                    "sets",
                    watchSets.filter((value) => value.id !== item.id)
                  );
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="times"
                  size={25}
                  style={{ marginRight: 15 }}
                  color={Colors[colorScheme].text}
                />
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.button}>
        <Button
          title={"Submit"}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 10,
    borderWidth: 1,
  },
});

export default WorkoutForm;
