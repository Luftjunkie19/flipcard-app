import { useState } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/Colors";
import Button from "../UI-components/Button";
import { loginToApp } from "../util/AuthManagment";
import { useAuthContext } from "../util/useAuthContext";

function LoginScreen() {
  const { user, isAuthenticated, dispatch } = useAuthContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isTextInvisble, setIsTextInVisible] = useState(true);

  const loginUser = async () => {
    const credentials = await loginToApp(email, password);

    dispatch({
      type: "LOGIN",
      payload: { ...credentials.data },
    });

    await AsyncStorage.setItem("user", JSON.stringify({ ...credentials.data }));

    console.log(user);
  };

  const toggleState = () => {
    setIsTextInVisible(!isTextInvisble);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.text}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          placeholder="Type your email"
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.text}>Password:</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            secureTextEntry={isTextInvisble}
            style={styles.text}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            placeholder="Type your password"
          />

          <Button
            iconName={isTextInvisble ? "eye" : "eye-off"}
            pressHandler={toggleState}
          ></Button>
        </View>
      </View>

      <Button
        bgColor={Colors.blue700}
        rippleColor={Colors.blue500}
        pressHandler={loginUser}
      >
        Login
      </Button>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "white",
  },

  formField: {
    backgroundColor: "#3a86ff",
    margin: 8,
    paddingHorizontal: 12,
    width: "75%",
    paddingVertical: 8,
    borderRadius: 5,
  },
});
