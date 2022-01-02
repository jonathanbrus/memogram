import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

getAnalytics(fbApp);

export const initApp = () => initializeApp(firebaseConfig);
