import React from "react";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function LanguageSet({ data, pressedHandler, id }) {
  return (
    <View style={styles.languageContainer}>
      <Pressable
        style={styles.insideButton}
        onPress={pressedHandler.bind(this, id)}
      >
        <Image
          source={{ uri: data.flagImage }}
          style={{ width: 150, height: 95 }}
        />
        <Text style={styles.text}>{data.name}</Text>
      </Pressable>
    </View>
  );
}

export default LanguageSet;

const styles = StyleSheet.create({
  languageContainer: {
    margin: 6,
    backgroundColor: "#00509d",
    padding: 8,
    borderRadius: 5,
  },

  text: {
    color: "white",
    fontWeight: "600",
  },

  insideButton: {
    alignItems: "center",
  },
});
