import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '../constants/Colors';
import Button from '../UI-components/Button';
import { useAuthContext } from '../util/useAuthContext';
import { useDocument } from '../util/useDocument';

function UserScreen() {
  const { user, isAuthenticated, dispatch } = useAuthContext();
  const { document } = useDocument("users", user.localId);
  const [userItem, setUserItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (document) {
      setUserItem(document);
      setIsLoading(false);
    }
  }, [document]);

  return (
    <View style={styles.container}>
      {!isLoading && userItem ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: document.photoURL }} style={styles.image} />
          </View>

          <Text style={styles.text}>Nickname: {userItem.displayName}</Text>
          <Text style={styles.text}>Email: {userItem.email}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}

      <View style={styles.buttonHolder}>
        <Button
          bgColor={Colors.red100}
          rippleColor={Colors.red500}
          pressHandler={async () => {
            dispatch({ type: "LOGOUT" });
            await AsyncStorage.removeItem("user");
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003049",
    alignItems: "center",
  },

  imageContainer: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },

  text: {
    color: "white",
  },

  buttonHolder: {
    marginTop: 12,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
