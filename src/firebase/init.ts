import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase-env";

export let firebaseApp = initializeApp(firebaseConfig);
export let analytics = getAnalytics(firebaseApp);

export const initializeFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig);
  analytics = getAnalytics(firebaseApp);

  return {
    firebaseApp,
    analytics,
  }
}

