import { useEffect, useState } from "react";

import axios from "axios";
import * as Notifications from "expo-notifications";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AddedFlipCards from "../components/AddedFlipCards";
import { Colors } from "../constants/Colors";
import Button from "../UI-components/Button";
import { updateDatabase } from "../util/Database";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

function CreateFlipCards({ route }) {
  const [nativeWord, setNativeWord] = useState("");
  const [foreignWord, setForeignWord] = useState("");
  const [setsTitle, setSetsTitle] = useState("");
  const [flipcards, setFlipcards] = useState([]);
  const [token, setToken] = useState();
  const navigation = useNavigation();
  const database = route.params.database;
  const chosenId = route.params.addToId;
  const chosenLangSet = database.find((set) => set.id === chosenId);

  useEffect(() => {
    if (chosenLangSet) {
      navigation.setOptions({
        title: `Flipcards set for ${chosenLangSet.name}`,
      });
    }
  }, [chosenLangSet]);

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getExpoPushTokenAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need that shit to send you push notifications."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      setToken(pushTokenData.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification.request.content.data);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification.request.content.data);
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  const pushNotification = (message) => {
    axios.post("https://exp.host/--/api/v2/push/send", {
      to: token,
      title: "Flipcardio",
      body: message,
    });
  };

  const addNewFlipCard = () => {
    if (nativeWord.trim().length !== 0 || foreignWord.trim().length !== 0) {
      const flipcard = {
        nativeLang: nativeWord,
        translation: foreignWord,
        flipcardId: new Date().getTime() + 1000000000,
      };
      let allFlipcards = [...flipcards, flipcard];
      setFlipcards(allFlipcards);
      setNativeWord("");
      setForeignWord("");
      console.log(allFlipcards);
    }
  };

  const editFlipCard = () => {};

  const removeFlipCard = () => {};

  const confirmFlipCardSet = async () => {
    const wordsFlipcards = {
      flipCardsetName: setsTitle,
      flipcards: flipcards,
      cardsId: `cardsId-#${new Date().getTime()}-${new Date().getFullYear()}`,
    };

    await updateDatabase(chosenLangSet.id, wordsFlipcards, "languageSets");
    pushNotification(`You added ${setsTitle} successfully 😁, keep going !`);
    navigation.navigate("MainScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, styles.text]}>Add new Flipcard-set !</Text>
      </View>

      <View style={styles.formField}>
        <Text style={styles.text}>Name of your Flipcardset:</Text>
        <TextInput
          style={styles.text}
          onChangeText={(text) => {
            setSetsTitle(text);
          }}
          placeholderTextColor="gray"
          value={setsTitle}
          placeholder="Type the set name"
        />
      </View>

      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text style={styles.text}>Your Language:</Text>
            <TextInput
              onChangeText={(text) => {
                setNativeWord(text);
              }}
              style={styles.text}
              value={nativeWord}
              placeholderTextColor="gray"
              placeholder="In your language"
            />
          </View>

          <View>
            <Text style={styles.text}>
              Translation for {chosenLangSet.name}:
            </Text>
            <TextInput
              onChangeText={(text) => {
                setForeignWord(text);
              }}
              style={styles.text}
              value={foreignWord}
              placeholderTextColor="gray"
              placeholder="Translation for word"
            />
          </View>
        </View>

        <View style={styles.buttonHolder}>
          <Button
            pressHandler={addNewFlipCard}
            bgColor={Colors.blue700}
            rippleColor={Colors.blue300}
          >
            Add Flipcard
          </Button>
        </View>
      </View>

      {flipcards.length > 0 ? (
        <AddedFlipCards
          addedFlipcards={flipcards}
          removeItem={removeFlipCard}
          editItem={editFlipCard}
        />
      ) : (
        <View style={styles.headerContainer}>
          <Text style={styles.text}>No flipcards added yet</Text>
        </View>
      )}

      <View style={styles.buttonHolder}>
        <Button
          bgColor={Colors.blue800}
          rippleColor={Colors.blue500}
          pressHandler={confirmFlipCardSet}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

export default CreateFlipCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formField: {
    padding: 8,
    margin: 10,
  },

  header: {
    fontWeight: "900",
    fontSize: 24,
  },

  text: {
    color: "white",
  },

  headerContainer: {
    alignItems: "center",
    margin: 8,
  },

  buttonHolder: {
    alignItems: "center",
  },
});
