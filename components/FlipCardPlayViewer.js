import React from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

function FlipCardPlayViewer({
  flipCard,
  isForeVisible,
  displayBack,
  displayFore,
}) {
  if (isForeVisible) {
    return (
      <View style={styles.cardContainer}>
        <Pressable
          onPress={displayBack}
          style={({ pressed }) => [
            styles.insideCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.text}>{flipCard.nativeLang}</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.cardContainer}>
        <Pressable
          onPress={displayFore}
          style={({ pressed }) => [
            styles.insideCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.text}>{flipCard.translation}</Text>
        </Pressable>
      </View>
    );
  }
}

export default FlipCardPlayViewer;

const styles = StyleSheet.create({
  insideCard: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 320,
    minHeight: 180,
    backgroundColor: "#4ea8de",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 4,
  },

  cardContainer: {
    margin: 16,
  },

  pressed: {
    opacity: 0.75,
  },

  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
