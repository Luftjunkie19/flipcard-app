import React, { useLayoutEffect } from 'react';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '../constants/Colors';
import Button from '../UI-components/Button';
import FlipCardPreview from '../UI-components/FlipCardPreview';
import { deleteFromDatabase } from '../util/Database';
import { useDocument } from '../util/useDocument';
import { useDocuments } from '../util/useDocuments';

function LanguageScreen({ route, navigation }) {
  const langId = route.params.langId;
  const { document } = useDocument("languageSets", langId);
  const { documents } = useDocuments("languageSets");

  const removeItem = async () => {
    navigation.navigate("MainScreen");

    Alert.alert("Success !", "You removed set successfully");

    await deleteFromDatabase(langId, "languageSets");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Button
            iconName="add-sharp"
            bgColor={Colors.blue700}
            rippleColor={Colors.blue500}
            pressHandler={() => {
              navigation.navigate("CreateFlipcards", {
                addToId: langId,
                database: documents,
              });
            }}
          >
            Add Flipcards
          </Button>

          <Button
            iconName="trash-bin"
            bgColor={Colors.red500}
            pressHandler={removeItem}
          >
            Remove
          </Button>
        </View>
      ),
    });

    if (document) {
      navigation.setOptions({
        title: document.name,
      });
    } else {
      navigation.setOptions({
        title: "Loading....",
      });
    }
  }, [document]);

  const navigateToId = (navId) => {
    if (document) {
      navigation.navigate("FlipCardsViewer", {
        languageSetId: document.id,
        flipCardId: navId,
      });
    }
  };

  const renderItem = (itemData) => {
    return (
      <FlipCardPreview cardData={itemData.item} pressedHandler={navigateToId} />
    );
  };

  return (
    <View style={styles.container}>
      {document && document.flipCardsets.length === 0 && (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.text}>
            No flipcard sets for {document.name} yet 😅
          </Text>
        </View>
      )}

      {document && (
        <FlatList
          data={document.flipCardsets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
    </View>
  );
}

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },

  text: {
    color: "white",
  },
});
