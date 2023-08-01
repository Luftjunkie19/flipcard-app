import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LanguageSet from '../components/LanguageSet';
import { useAuthContext } from '../util/useAuthContext';
import { useDocuments } from '../util/useDocuments';

function MainScreen({ navigation }) {
  const { documents } = useDocuments("languageSets");
  const { user } = useAuthContext();

  const yours = documents.filter((doc) => doc.ownerId === user.localId);

  const navigateToLanguageScreen = (id) => {
    navigation.navigate("LanguageScreen", {
      langId: id,
      database: documents,
    });
    console.log(id);
  };

  const renderLngSets = (itemData) => {
    return (
      <LanguageSet
        data={itemData.item}
        pressedHandler={navigateToLanguageScreen}
        id={itemData.item.id}
      />
    );
  };

  return (
    <View style={styles.langSetsContainer}>
      {yours.length > 0 ? (
        <Text style={styles.text}>You created already {yours.length}</Text>
      ) : (
        <Text style={styles.text}>No Language Sets Created Yet</Text>
      )}

      {documents && (
        <FlatList numColumns={2} data={yours} renderItem={renderLngSets} />
      )}
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  langSetsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003049",
  },

  text: {
    color: "white",
    margin: 6,
  },
});
