import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import * as React from "react";
import { createContainer } from "unstated-next";
import { firebaseConfig } from "../../../../Firebase/config";

export type IdentityProviderData = {
  username: string;
  password: string;
};

export type IdentityProviderFunction = (data: IdentityProviderData) => void;

interface IUseFirebaseAuth {
  app: FirebaseApp;
  isLoggedIn: boolean;
  auth: Auth;
  createAccount: IdentityProviderFunction;
  logIn: IdentityProviderFunction;
  signOutOfApp: () => void;
}

const useFirebaseAuth = (): IUseFirebaseAuth => {
  const app = React.useMemo(
    () => initializeApp(firebaseConfig),
    [firebaseConfig]
  );

  const auth = getAuth(app);
  const isLoggedIn = !!getAuth(app).currentUser;

  // Create a firebase account
  const createAccount = ({ username, password }: IdentityProviderData) => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  // Log in to an existing firebase account
  const logIn = ({ username, password }: IdentityProviderData) => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const signOutOfApp = () => {
    signOut(auth)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return {
    app,
    isLoggedIn,
    auth,
    createAccount,
    logIn,
    signOutOfApp,
  };
};

export const FirebaseAuthContainer = createContainer(useFirebaseAuth);
