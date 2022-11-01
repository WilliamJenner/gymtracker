import ActivitySelector from "@components/Activity/ActivitySelector";
import { Text, View } from "@components/common/Themed";
import TextField from "@components/form/common/TextField";
import { OneRepMax, OneRepMaxDto } from "@customTypes/app-types";
import useActivites from "@hooks/query/useActivitIes";
import { white } from "@styles/appStyles";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet } from "react-native";

interface IOneRepMaxFormProps {
  onSubmit: SubmitHandler<OneRepMaxDto>;
  defaultValues?: OneRepMax;
}

export const OneRepMaxForm = ({
  onSubmit,
  defaultValues,
}: IOneRepMaxFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OneRepMaxDto>({
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
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
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
          name="activity"
        />
      </View>

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
            labelText={`${name} (kg)`}
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
        name="value"
      />
      {errors.value && <Text>This is required.</Text>}
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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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
