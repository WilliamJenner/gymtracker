import { Picker } from "@react-native-picker/picker";
import { black, white } from "@styles/appStyles";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";
import { Activity, MuscleGroup } from "../types/index";
import TextField from "./TextField";

interface IActivityEntryProps {
  onSubmit: SubmitHandler<Activity>;
}

export default function ActivityEntry({ onSubmit }: IActivityEntryProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Activity>({
    defaultValues: {
      name: "",
      description: "",
      muscleGroup: MuscleGroup.BACK,
    },
  });

  return (
    <View style={styles.container}>
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
              onChangeText: onChange,
              value: value,
              style: styles.input,
            }}
          />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

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
              lightColor: black,
              darkColor: white,
            }}
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: onChange,
              value: value,
              style: styles.input,
            }}
          />
        )}
        name="description"
      />

      {errors.description && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
            style={{
              backgroundColor: white,
              width: "80%",
            }}
          >
            {Object.values(MuscleGroup).map((group: string | MuscleGroup) => {
              if (typeof group === "string") {
                return <Picker.Item label={group} value={group} key={group} />;
              }
            })}
          </Picker>
        )}
        name={"muscleGroup"}
      />

      {errors.muscleGroup && <Text>This is required.</Text>}

      <View style={styles.button}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "blue",
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
