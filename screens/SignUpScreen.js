import React from "react";
import { Image, StyleSheet, View } from "react-native";
import SignUpForm from "../components/SignUpScreen/SignUpForm";


const INSTAGRAM_LOGO =
  "https://www.freepnglogos.com/uploads/instagram-logo-png-hd-31.png";

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: INSTAGRAM_LOGO }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignUpScreen;
