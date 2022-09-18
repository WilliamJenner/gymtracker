import UserNamePasswordForm from "@components/form/UserNamePassword/UserNamePasswordForm";
import { FirebaseAuthContainer } from "@hooks/firebase/useFirebaseAuth";
import * as React from "react";

interface ILoggedOutUserProps {}

const LoggedOutUser = (props: ILoggedOutUserProps) => {
  const { logIn } = FirebaseAuthContainer.useContainer();

  return (
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
  );
};

export default LoggedOutUser;
