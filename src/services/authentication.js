import { fbAuth } from "../data/firebase/fire_auth";

import { users } from "./users";

const signIn = async ({ email, password, google = false }) => {
  let result;

  if (google) {
    result = await fbAuth.googleSignIn();
    if (result.error) {
      console.log({ error: result.error });
    }
  } else {
    result = await fbAuth.emailSignIn({ email, password });
    if (result.error) {
      console.log({ error: result.error });
    }
  }

  let user = await users.getOne({ uid: result.uid });

  if (!user.exists) {
    user = await users.createOne({
      uid: result.uid,
      name: result.displayName,
      email: result.email,
    });
  }

  return { uid: result.uid, name: user.name, email: user.email };
};

const signUp = async ({ name, email, password }) => {
  const result = await fbAuth.emailSignUp({ email, password });
  if (result.error) {
    console.log({ error: result.error });
  }

  const user = await users.createOne({ uid: result.uid, name, email });

  return user;
};

const signOut = async () => fbAuth.signOut();

const observer = fbAuth.authStateObserver({ getUserByUid: users.getOne });

export const authService = {
  signIn: signIn,
  signUp: signUp,
  signOut: signOut,
  observer: observer,
};
