import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";
import * as React from "react";
import { Button, ButtonGroup, Image } from "react-bootstrap";

interface IFirebaseControls {
  accountNavigate: () => void;
}

const FirebaseControls: React.FC<IFirebaseControls> = (
  props: IFirebaseControls
) => {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        return (
          <>
            {isSignedIn ? (
              <>
                <ButtonGroup>
                  {/* <Button disabled variant="danger">
                   
                  </Button> */}
                  <Image src={user.photoURL} className={"nav--user-profile"} />
                  <Button
                    onClick={() => {
                      props.accountNavigate();
                    }}
                    variant="danger"
                  >
                    Account
                  </Button>

                  <Button
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                    variant="danger"
                  >
                    Sign Out
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    const googleAuthProvider =
                      new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(googleAuthProvider);
                  }}
                  variant="danger"
                  className={""}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    const emailAuthProvider =
                      new firebase.auth.EmailAuthProvider();
                    firebase.auth().signInWithPopup(emailAuthProvider);
                  }}
                  variant="danger"
                  className={""}
                >
                  Sign In
                </Button>
              </>
            )}

            {/* <pre style={{ height: 300, overflow: "auto" }}>
              {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
            </pre> */}
          </>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default FirebaseControls;
