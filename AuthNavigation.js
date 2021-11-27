import React from "react";
import { View, Text } from "react-native";
import { SignedInStack, SignedOutStack } from "./screens/Navigation";

const AuthNavigation = ({ currentUser }) => {
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
