import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import FlipCardPlayViewer from './FlipCardPlayViewer';

function PlayComponent({ flipCardData }) {
  const [flipCardNumber, setFlipCardNumber] = useState(0);
  const [shownBackground, setShownBackground] = useState(false);
  const [shownForeground, setShownForeground] = useState(true);

  const displayForeground = () => {
    setShownForeground(true);
    setShownBackground(false);
  };

  const displayBackground = () => {
    setShownBackground(true);
    setShownForeground(false);
  };

  const pushForward = () => {
    if (flipCardNumber < flipCardData.length - 1) {
      setFlipCardNumber(flipCardNumber + 1);
      setShownForeground(true);
      setShownBackground(false);
    } else {
      setFlipCardNumber(0);
      setShownForeground(true);
      setShownBackground(false);
    }
    console.log(flipCardNumber);
  };

  const pullBack = () => {
    if (flipCardNumber > 0) {
      setFlipCardNumber(flipCardNumber - 1);
      setShownForeground(true);
      setShownBackground(false);
    } else {
      setFlipCardNumber(flipCardData.length - 1);
      setShownForeground(true);
      setShownBackground(false);
    }
    console.log(flipCardNumber);
  };

  return (
    <View>
      <View style={styles.gameContainer}>
        <FlipCardPlayViewer
          flipCard={flipCardData[flipCardNumber]}
          isForeVisible={shownForeground}
          displayFore={displayForeground}
          displayBack={displayBackground}
        />
      </View>

      {flipCardData.length > 1 && (
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={pullBack}
            style={styles.button}
            android_ripple={{ color: "blue" }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              color="white"
              size={18}
            />
            <Text style={styles.text}>Previous</Text>
          </Pressable>

          <Pressable
            onPress={pushForward}
            style={styles.button}
            android_ripple={{ color: "blue" }}
          >
            <Text style={styles.text}>Next</Text>
            <Ionicons
              name="arrow-forward-circle-outline"
              color="white"
              size={18}
            />
          </Pressable>
        </View>
      )}

      <View style={styles.gameContainer}>
        <Text style={[styles.text, { fontWeight: 800 }, { fontSize: 24 }]}>
          {flipCardNumber + 1}/{flipCardData.length}
        </Text>
      </View>
    </View>
  );
}

export default PlayComponent;

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    margin: 10,
    padding: 8,
  },

  text: {
    color: "white",
    margin: 5,
  },

  gameContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#00b4d8",
    paddingVertical: 4,
    paddingHorizontal: 16,
    minWidth: 120,
  },
});
