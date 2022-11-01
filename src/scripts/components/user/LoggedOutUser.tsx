import { View } from "@components/common/Themed";
import UserNamePasswordForm from "@components/User/UserNamePasswordForm";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import * as React from "react";

interface ILoggedOutUserProps {}

const LoggedOutUser = (props: ILoggedOutUserProps) => {
  const { logIn } = FirebaseAuthContainer.useContainer();

  return (
    <View style={{ flexGrow: 1 }}>
      <UserNamePasswordForm
        onSubmit={(data) => {
          logIn({
            username: data.username.trim(),
            password: data.password,
          });
        }}
        defaultValues={{
          username: "",
          password: "",
        }}
      />
    </View>
  );
};

export default LoggedOutUser;
