import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import * as React from "react";
import { Button } from "react-native";

interface ILoggedOutUserProps {}

const LoggedInUser = (props: ILoggedOutUserProps) => {
  const { signOutOfApp } = FirebaseAuthContainer.useContainer();

  return (
    <Button
      title={"Log out"}
      onPress={() => {
        signOutOfApp();
      }}
    ></Button>
  );
};

export default LoggedInUser;
