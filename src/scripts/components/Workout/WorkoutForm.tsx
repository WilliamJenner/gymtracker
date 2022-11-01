import { Text, View, ViewProps } from "@components/common/Themed";
import { ThemedTextField } from "@components/form/common/ThemedFormFields";
import { WorkoutDto } from "@customTypes/app-types";
import { white } from "@styles/appStyles";
import * as React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button, StyleSheet } from "react-native";

interface IWorkoutFormProps {
  onSubmit: SubmitHandler<WorkoutDto>;
  viewProps?: ViewProps;
  defaultValues: WorkoutDto;
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
  } = useForm<WorkoutDto>({
    defaultValues: defaultValues,
  });

  const { fields: setsFields } = useFieldArray({ control, name: "sets" });

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

      <View style={{ padding: 10 }}>
        <Text>Add Sets</Text>

        {setsFields.map((field, index) => {
          <View key={index}>{field.id}</View>;
        })}
      </View>

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
