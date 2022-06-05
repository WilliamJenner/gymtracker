import { StorageKeys } from "@constants/StorageKeys";
import { OneRepMax } from "@hooks/useOneRepMax";
import useStorage from "@hooks/useStorage";
import { white } from "@styles/appStyles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, FlatList, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Activity, MuscleGroup } from "../types/index";
import TextField from "./TextField";

interface IOneRepMaxBuilderProps {
  onSubmit: (data: OneRepMax) => void;
}

export default function OneRepMaxBuilder({ onSubmit }: IOneRepMaxBuilderProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OneRepMax>({
    defaultValues: {
      activity: { name: "", description: "", muscleGroup: MuscleGroup.BACK },
      max: 0,
    },
  });

  const { data: activites } = useStorage<Activity>({
    key: StorageKeys.Activites,
  });

  const watchActivity = watch("activity");

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <FlatList
            data={activites}
            horizontal={true}
            renderItem={({ item }: { item: Activity }) => {
              return (
                <Pressable
                  onPress={() => {
                    setValue("activity.name", item.name);
                    setValue("activity.description", item.description);
                    setValue("activity.muscleGroup", item.muscleGroup);
                  }}
                >
                  {({ pressed }) => {
                    return (
                      <View
                        style={{
                          backgroundColor: pressed
                            ? "green"
                            : watchActivity.name === item.name
                            ? "red"
                            : "blue",
                          ...styles.activityCard,
                        }}
                      >
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.muscleGroup}</Text>
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
        )}
        name="activity"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextField
            viewProps={{ style: styles.textField }}
            labelProps={{
              style: styles.label,
            }}
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: (text) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
              style: styles.input,
            }}
          />
        )}
        name="max"
      />
      {errors.max && <Text>This is required.</Text>}

      <Button
        title={"Submit"}
        onPress={() => {
          console.log(errors);
          handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
