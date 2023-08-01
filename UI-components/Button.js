import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

function Button({ children, iconName, pressHandler, rippleColor, bgColor }) {
  let iconShow;

  if (iconName) {
    iconShow = <Ionicons name={iconName} color="white" size={24} />;
  }

  return (
    <View style={[styles.buttonOutside, { backgroundColor: bgColor }]}>
      <Pressable
        onPress={pressHandler}
        android_ripple={{ color: rippleColor, borderless: true }}
      >
        <View style={styles.buttonInside}>
          <Text style={styles.text}>{children}</Text>
          {iconShow}
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonOutside: {
    maxWidth: 200,
    borderRadius: 10,
  },

  buttonInside: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 4,
  },

  text: {
    color: "white",
    marginRight: 4,
  },
});
