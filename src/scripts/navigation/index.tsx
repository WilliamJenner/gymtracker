/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { View } from "@components/common/Themed";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "@customTypes/";
import { FontAwesome } from "@expo/vector-icons";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivitesScreen from "@screens/ActivitesScreen";
import { EditExerciseScreen } from "@screens/Form/Exercise/EditExerciseScreen";
import AddOneRepMaxScreen from "@screens/Form/OneRepMax/AddOneRepMaxScreen";
import EditOneRepMaxScreen from "@screens/Form/OneRepMax/EditOneRepMaxScreen";
import AddWorkoutScreen from "@screens/Form/Workout/AddWorkoutScreen";
import { EditWorkoutScreen } from "@screens/Form/Workout/EditWorkoutScreen";
import UserScreen from "@screens/UserScreen";
import WorkoutProgressScreen from "@screens/WorkoutProgressScreen";
import WorkoutsScreen from "@screens/WorkoutsScreen";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
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
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />

        {/* <Stack.Screen
          name="AddOneRepMax"
          component={AddOneRepMaxScreen}
          options={{ title: "Add One Rep Max" }}
        /> */}
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
        <Stack.Screen
          name="WorkoutProgress"
          component={WorkoutProgressScreen}
          options={{ title: "Workout" }}
        />

        <Stack.Screen
          name="AddOneRepMax"
          component={AddOneRepMaxScreen}
          options={{ title: "Add One Rep Max" }}
        />

        <Stack.Screen
          name="EditOneRepMax"
          component={EditOneRepMaxScreen}
          options={{ title: "Edit One Rep Max" }}
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
  const { isLoggedIn } = FirebaseAuthContainer.useContainer();

  return (
    <BottomTab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={({ navigation }: RootTabScreenProps<"User">) => ({
          title: "User",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        })}
      />

      {isLoggedIn && (
        <>
          <BottomTab.Screen
            name="Activites"
            component={ActivitesScreen}
            options={({ navigation }: RootTabScreenProps<"Activites">) => ({
              title: "Activites",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="soccer-ball-o" color={color} />
              ),
              headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    onPress={() => navigation.navigate("AddOneRepMax")}
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
        </>
      )}
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
