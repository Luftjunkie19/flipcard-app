import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import * as Notifications from 'expo-notifications';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors } from '../constants/Colors';
import Button from '../UI-components/Button';
import LanguageInput from '../UI-components/LanguageInput';
import { addToDatabase } from '../util/Database';
import { useAuthContext } from '../util/useAuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

function LanguageForm({ onCreatedLangSet }) {
  const { user } = useAuthContext();
  const [languageName, setLanguageName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [languageFlag, setLanguageFlag] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

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
          importance: Notifications.AndroidImportance.HIGH,
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
      to: `${token}`,
      title: "Flipcardio",
      body: message,
    });
  };

  function onSelectedLanguageFlag(image) {
    setLanguageFlag(`https://flagcdn.com/w80/${image}.png`);
    setCountryCode(image);
  }

  async function createNewLanguage() {
    setError(null);
    if (
      languageName.trim().length !== 0 &&
      languageFlag.startsWith("https://")
    ) {
      await addToDatabase(
        {
          name: languageName,
          flagImage: languageFlag,
          id: `langSet-${new Date().getTime()}`,
          ownerId: user.localId,
          flipCardsets: [],
        },
        "languageSets",
        `langSet-${new Date().getTime()}`
      );

      setLanguageName("");
      setError(null);
      pushNotification(
        `Wow 😲, you created language-set called ${languageName}`
      );
      setCountryCode("");
      setLanguageFlag("");
      onCreatedLangSet();
    } else {
      Alert.alert("ERROR", "Please check the data of your set.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.text]}>Add new Language Set !</Text>
      <View style={styles.inputsConatiner}>
        <View style={styles.formField}>
          <Text style={styles.text}>Language's Country:</Text>
          <LanguageInput
            onSelectedFlag={onSelectedLanguageFlag}
            flagValue={countryCode}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.text}>Name of set:</Text>
          <TextInput
            placeholder="Type the name of the language"
            placeholderTextColor="gray"
            style={styles.text}
            onChangeText={(text) => {
              setLanguageName(text);
            }}
            value={languageName}
          />
        </View>
      </View>

      <Button
        bgColor={Colors.blue300}
        rippleColor={Colors.blue500}
        iconName="language-outline"
        pressHandler={createNewLanguage}
      >
        Create new Language
      </Button>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.text}>{error}</Text>
        </View>
      )}
    </View>
  );
}

export default LanguageForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003049",
    alignItems: "center",
  },

  inputsConatiner: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    margin: 16,
  },

  formField: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 8,
    backgroundColor: "#0077b6",
    width: 250,
    borderRadius: 5,
  },

  errorContainer: {
    padding: 6,
    backgroundColor: "red",
    margin: 8,
    borderRadius: 10,
  },

  text: {
    color: "white",
  },

  header: {
    fontWeight: "900",
    fontSize: 24,
    marginTop: 15,
  },
});
