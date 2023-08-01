import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

function CreatedFlipCard({ flipcardData, deleteItem, addItem, editItem }) {
  return (
    <View style={styles.flipcardItem}>
      <View style={styles.langSection}>
        <Text style={[styles.textEmphasized, styles.text]}>Native:</Text>
        <Text style={styles.text}>{flipcardData.nativeLang}</Text>
      </View>

      <View style={styles.langSection}>
        <Text style={[styles.textEmphasized, styles.text]}>Foreign:</Text>
        <Text style={styles.text}>{flipcardData.translation}</Text>
      </View>
    </View>
  );
}

export default CreatedFlipCard;

const styles = StyleSheet.create({
  flipcardItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#758bfd",
    margin: 6,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  langSection: {
    alignItems: "center",
  },

  textEmphasized: {
    fontWeight: "800",
  },

  text: {
    color: "white",
  },
});
