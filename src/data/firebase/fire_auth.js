import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { initApp } from "./index";

initApp();

const auth = getAuth();

const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    return result.user;
  } catch (error) {
    return { error: error.message };
  }
};

const emailSignIn = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result.user;
  } catch (error) {
    return { error: error.message };
  }
};

const emailSignUp = async ({ email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    return result.user;
  } catch (error) {
    return { error: error.message };
  }
};

const signOut = () => auth.signOut();

const authStateObserver = ({ getUserByUid }) => {
  return ({ setAuthStatus, setUser, initFetch }) => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return setAuthStatus(false);
      }

      const userDoc = await getUserByUid({ uid: user.uid });

      setUser({
        uid: user.uid,
        name: userDoc.name,
        email: userDoc.email,
      });
      initFetch(user.uid);
      setAuthStatus(true);
    });
  };
};

export const fbAuth = {
  authStateObserver: authStateObserver,
  googleSignIn: googleSignIn,
  emailSignIn: emailSignIn,
  emailSignUp: emailSignUp,
  signOut: signOut,
};
