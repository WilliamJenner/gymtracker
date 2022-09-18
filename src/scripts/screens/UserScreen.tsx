import LoggedInUser from "@components/user/LoggedInUser";
import LoggedOutUser from "@components/user/LoggedOutUser";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function UserScreen({
  navigation,
}: RootStackScreenProps<"User">) {
  const { isLoggedIn } = FirebaseAuthContainer.useContainer();

  return (
    <>
      <View style={styles.container}>
        <View style={{ width: "100%", height: 100 }}>
          {isLoggedIn ? <LoggedInUser /> : <LoggedOutUser />}
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
