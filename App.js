import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AuthNavigation from "./AuthNavigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";
const auth = getAuth();
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = (user) =>  user ? setCurrentUser(user) : setCurrentUser(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      userHandler(user);
    });
  }, []);
  return <AuthNavigation currentUser={currentUser} />;
}
