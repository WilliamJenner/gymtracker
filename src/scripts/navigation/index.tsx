/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { View } from "@components/Themed";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "@customTypes/index";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddActivityScreen from "@screens/Form/Activity/AddActivityScreen";
import { EditActivityScreen } from "@screens/Form/Activity/EditActivityScreen";
import { AddExerciseScreen } from "@screens/Form/Exercise/AddExerciseScreen";
import { EditExerciseScreen } from "@screens/Form/Exercise/EditExerciseScreen";
import AddWorkoutScreen from "@screens/Form/Workout/AddWorkoutScreen";
import { EditWorkoutScreen } from "@screens/Form/Workout/EditWorkoutScreen";
import WorkoutsScreen from "@screens/WorkoutsScreen";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ActivitesScreen from "../screens/ActivitesScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="AddActivity"
          component={AddActivityScreen}
          options={{ title: "Add Activity" }}
        />
        <Stack.Screen
          name="EditActivity"
          component={EditActivityScreen}
          options={{ title: "Edit Activity" }}
        />

        <Stack.Screen
          name="AddExercise"
          component={AddExerciseScreen}
          options={{ title: "Add Exercise" }}
        />
        <Stack.Screen
          name="EditExercise"
          component={EditExerciseScreen}
          options={{ title: "Edit Exercise" }}
        />

        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: "Add Workout" }}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkoutScreen}
          options={{ title: "Edit Workout" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Activites"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Activites"
        component={ActivitesScreen}
        options={({ navigation }: RootTabScreenProps<"Activites">) => ({
          title: "Activites",
          tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("AddActivity")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={({ navigation }: RootTabScreenProps<"Exercises">) => ({
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bicycle" color={color} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("AddExercise")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />

      <BottomTab.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={({ navigation }: RootTabScreenProps<"Workouts">) => ({
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bullhorn" color={color} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("AddWorkout")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
