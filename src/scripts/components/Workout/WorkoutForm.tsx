import { Text, View, ViewProps } from "@components/common/Themed";
import GymSetForm from "@components/Exercise/GymSetForm";
import { ThemedTextField } from "@components/form/common/ThemedFormFields";
import { WorkoutDto } from "@customTypes/index";
import { white } from "@styles/appStyles";
import * as React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button, ScrollView, StyleSheet } from "react-native";

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

  const {
    fields: setsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "sets",
  });

  const [addingActivity, setAddingActivity] = React.useState<boolean>();

  return (
    <ScrollView>
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

        <View style={{ padding: 10, flex: 1 }}>
          <Text>Add Sets</Text>

          <View style={styles.button}>
            <Button
              title={"New Activity"}
              onPress={() => {
                setAddingActivity(true);
              }}
            />
          </View>

          {addingActivity && (
            <View style={{ backgroundColor: "red", padding: 2 }}>
              <GymSetForm
                onSubmit={(data) => {
                  append(data);
                  setAddingActivity(false);
                }}
                defaultValues={{
                  exercise: {
                    activity: undefined,
                    intensity: 10,
                    reps: 1,
                    restTime: 90,
                  },
                  sets: 1,
                }}
              />
            </View>
          )}

          {setsFields.map((field, index) => {
            return (
              <View key={field.id} style={{ flex: 1 }}>
                <Text>name {field?.exercise?.activity?.name}</Text>
                <Text>sets {field?.sets}</Text>
                <Text>reps {field?.exercise?.reps}</Text>
                <Text>intensity {field?.exercise?.intensity}</Text>

                <Button
                  title={"X"}
                  onPress={() => {
                    remove(index);
                  }}
                />
              </View>
            );
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
    </ScrollView>
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
