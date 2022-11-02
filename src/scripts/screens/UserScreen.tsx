import { Text, View } from "@components/common/Themed";
import OneRepMaxTile from "@components/OneRepMax/OneRepMaxTile";
import LoggedInUser from "@components/User/LoggedInUser";
import LoggedOutUser from "@components/User/LoggedOutUser";
import { RootStackScreenProps } from "@customTypes/";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import useOneRepMax from "@hooks/query/useOneRepMax";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";

export default function UserScreen({
  navigation,
}: RootStackScreenProps<"User">) {
  const { isLoggedIn } = FirebaseAuthContainer.useContainer();
  const { navigate } = useNavigation();

  const logInContainerStyle = () => {
    return isLoggedIn
      ? { width: "100%", height: 100 }
      : { width: "100%", flexGrow: 1 };
  };

  const { oneRepMaxes } = useOneRepMax();

  return (
    <>
      <View style={styles.container}>
        <View style={logInContainerStyle()}>
          {isLoggedIn ? <LoggedInUser /> : <LoggedOutUser />}
        </View>

        <View style={styles.details}>
          {isLoggedIn && (
            <ScrollView>
              <View style={styles.container}>
                <Text>Your maxes</Text>
                <Button
                  title="Add"
                  onPress={() => {
                    navigate("AddOneRepMax");
                  }}
                />

                <View style={{ flex: 1 }}>
                  {oneRepMaxes?.data?.map((orm) => {
                    return <OneRepMaxTile oneRepMax={orm} key={orm.id} />;
                  })}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  details: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
