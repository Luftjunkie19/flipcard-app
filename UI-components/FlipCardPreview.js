import { Pressable, StyleSheet, Text, View } from "react-native";

function FlipCardPreview({ cardData, pressedHandler }) {
  const conditional = cardData.flipcards.length > 1 ? "flipcards" : "flipcard";

  return (
    <View style={styles.flipCardOutside}>
      <Pressable
        style={styles.flipCardInside}
        onPress={pressedHandler.bind(this, cardData.cardsId)}
        android_ripple={{ color: "#457b9d", borderless: true }}
      >
        <Text style={styles.text}>{cardData.flipCardsetName}</Text>
        <Text style={styles.text}>
          {cardData.flipcards.length} {conditional}
        </Text>
      </Pressable>
    </View>
  );
}

export default FlipCardPreview;

const styles = StyleSheet.create({
  flipCardOutside: {
    backgroundColor: "#a1c4fd",
    flex: 1 / 2,
    margin: 6,
    borderRadius: 5,
  },

  flipCardInside: {
    padding: 10,
  },

  text: {
    color: "white",
  },
});
