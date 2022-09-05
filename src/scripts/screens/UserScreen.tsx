import UserNamePasswordForm from "@components/form/UserNamePassword/UserNamePasswordForm";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import useTest from "@hooks/query/UseTest";
import React from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function UserScreen({
  navigation,
}: RootStackScreenProps<"User">) {
  const { isLoggedIn, logIn, signOutOfApp } =
    FirebaseAuthContainer.useContainer();
  const {} = useTest();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>hi</Text>
        <View style={{ width: "100%", height: 100 }}>
          {!isLoggedIn && (
            <UserNamePasswordForm
              onSubmit={(data) => {
                logIn({ username: data.username, password: data.password });
              }}
              defaultValues={{
                username: "",
                password: "",
              }}
            />
          )}
          {isLoggedIn && (
            <Button
              title={"Log out"}
              onPress={() => {
                signOutOfApp();
              }}
            ></Button>
          )}
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.link}>
          <Text style={styles.linkText}>Store</Text>
        </TouchableOpacity>
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
