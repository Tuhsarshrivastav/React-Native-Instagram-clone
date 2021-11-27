import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { app, db } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebase = app;
const auth = getAuth();

const onLogin = async (email, password, navigation) => {
  alert("OK");
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("Firebase login successed", email, password);
      }
    );
  } catch (error) {
    Alert.alert(
      "This aint your account Bitch",
      error.message + `\n\n Try another way bitch`,
      [
        {
          text: "Try Again",
          onPress: () => console.log("TRY AGAIN"),
          style: "cancel",
        },
        {
          text: "Sign Up",
          onPress: () => navigation.push("RegisterScreen"),
        },
      ]
    );
  }
};

const validationScheme = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required()
    .min(6, "Your password needs to be at least 6 characters."),
});

const LoginForm = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => onLogin(values.email, values.password, navigation)}
      validationSchema={validationScheme}
      validateOnMount={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.wrapper}>
          <View style={{ marginBottom: 8 }}>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="gray"
                placeholder="Phone Number, Username or Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCorrect={false}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                onFocus={setFieldTouched}
                //   style={{ color: "white" }}
              />
            </View>
            {touched["email"] && errors["email"] && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
          </View>
          <View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="gray"
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry
                autoCorrect={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                onFocus={setFieldTouched}
                //   style={{ color: "white" }}
              />
            </View>
            {touched["password"] && errors["password"] && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
          </View>
          <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
            <Text style={{ color: "#6bb0f5" }}>Forgot Password?</Text>
          </View>
          <Pressable
            titleSize={20}
            style={styles.button(isValid)}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push("RegisterScreen")}>
              <Text style={{ color: "#6bb0f5" }}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9Acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default LoginForm;
