import { useState } from "react";

import {
  launchImageLibraryAsync,
  PermissionStatus,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/Colors";
import Button from "../UI-components/Button";
import { signInWithCredentials } from "../util/AuthManagment";
import { useAuthContext } from "../util/useAuthContext";

function SignInScreen({ navigation }) {
  const { dispatch } = useAuthContext();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [textInVisible, setTextInVisible] = useState(true);
  const [image, setImage] = useState(null);

  const [status, requestPermission] = useMediaLibraryPermissions();

  const checkPermissions = async () => {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const request = await requestPermission();

      return request.granted;
    }

    if (status.status === PermissionStatus.DENIED) {
      const request = await requestPermission();

      return request.granted;
    }

    return true;
  };

  const setAnImage = async () => {
    const verified = await checkPermissions();
    if (!verified) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(image.assets[0].uri);

    return;
  };

  const signUpWithCredentials = async () => {
    const userCredentials = await signInWithCredentials(
      email,
      password,
      nickname,
      image
    );

    console.log(userCredentials.data);

    dispatch({
      type: "LOGIN",
      payload: { ...userCredentials.data },
    });

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...userCredentials.data })
    );
  };

  const navigateToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const toggleState = () => {
    setTextInVisible(!textInVisible);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.form,
          { alignItems: "center", justifyContent: "center", width: "100%" },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.formField}>
            <Text style={styles.text}>Nickname:</Text>
            <TextInput
              onChangeText={(text) => {
                setNickname(text);
              }}
              placeholder="Type nickname"
              style={{ color: "white" }}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.text}>Email:</Text>
            <TextInput
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder="Type email"
              style={{ color: "white" }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.formField}>
            <Text style={styles.text}>Image:</Text>
            <Button iconName="images" pressHandler={setAnImage}>
              Select image
            </Button>
          </View>

          <View style={styles.formField}>
            <Text style={styles.text}>Password:</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={textInVisible}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder="Type password"
                style={{ color: "white" }}
              />

              <Button
                iconName={textInVisible ? "eye" : "eye-off"}
                pressHandler={toggleState}
              ></Button>
            </View>
          </View>
        </View>

        <Button
          bgColor={Colors.blue300}
          rippleColor={Colors.blue500}
          pressHandler={signUpWithCredentials}
        >
          Sign Up !
        </Button>
      </View>

      <View style={[styles.form, { margin: 10 }]}>
        <Button
          bgColor={Colors.blue300}
          rippleColor={Colors.blue500}
          pressHandler={navigateToLogin}
        >
          Move to Login
        </Button>
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    padding: 6,
  },

  text: {
    color: "white",
  },

  form: {
    padding: 6,
  },

  formField: {
    backgroundColor: "#3a86ff",
    margin: 8,
    paddingHorizontal: 12,
    width: "45%",
    paddingVertical: 8,
    borderRadius: 5,
    color: "white",
  },

  passwordField: {
    backgroundColor: "#3a86ff",
    margin: 8,
    paddingHorizontal: 12,
    width: "75%",
    paddingVertical: 8,
    borderRadius: 5,
  },
});
