import ActivitySelector from "@components/Activity/ActivitySelector";
import { View, ViewProps } from "@components/common/Themed";
import { ThemedTextField } from "@components/form/common/ThemedFormFields";
import { GymSetDto } from "@customTypes/index";
import useActivites from "@hooks/query/useActivitIes";
import { white } from "@styles/appStyles";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";

interface IGymSetFormProps {
  onSubmit: SubmitHandler<GymSetDto>;
  viewProps?: ViewProps;
  defaultValues: GymSetDto;
}

const GymSetForm = ({
  onSubmit,
  viewProps,
  defaultValues,
}: IGymSetFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GymSetDto>({
    defaultValues: defaultValues,
  });

  const { activities } = useActivites({});

  const getSelectedActivity = React.useCallback(
    (activityId?: string) => {
      return activities?.data?.find((a) => a.id === activityId);
    },
    [activities.data]
  );

  return (
    <View style={styles.container} {...viewProps}>
      <View style={styles.componentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <ActivitySelector
              activites={activities.data}
              selectedActivityId={value?.id}
              onValueChange={(activityId: string) => {
                const selectedActivity = getSelectedActivity(activityId);
                if (selectedActivity) {
                  onChange(selectedActivity);
                }
              }}
            />
          )}
          name="exercise.activity"
        />
      </View>

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
              onChangeText: (text: string) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.exercise?.reps?.message}
          />
        )}
        name="exercise.reps"
      />

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
              onChangeText: (text: string) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.sets?.message}
          />
        )}
        name="sets"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required" },
          max: { value: 100, message: "Max 100" },
          min: { value: 0, message: "Min 0" },
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <ThemedTextField
            labelText={name}
            inputProps={{
              onBlur: onBlur,
              onChangeText: (text) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.exercise?.intensity?.message}
          />
        )}
        name="exercise.intensity"
      />

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
              onChangeText: (text: string) => {
                onChange(Number(text));
              },
              value: value.toString(),
              keyboardType: "numeric",
            }}
            validationLabelText={errors?.exercise?.restTime?.message}
          />
        )}
        name="exercise.restTime"
      />

      <Button
        title={"Submit"}
        onPress={() => {
          handleSubmit(onSubmit)();
        }}
      />
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
  componentContainer: {
    width: "100%",
    padding: 10,
  },
});

export default GymSetForm;
