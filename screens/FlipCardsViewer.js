import {
  useEffect,
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddedFlipCards from '../components/AddedFlipCards';
import PlayComponent from '../components/PlayComponent';
import { useDocument } from '../util/useDocument';

function FlipCardsViewer({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [flipcardSet, setFlipcardSet] = useState();
  const flipCardSetId = route.params.flipCardId;
  const langSetId = route.params.languageSetId;
  const { document } = useDocument("languageSets", langSetId);

  useEffect(() => {
    if (document) {
      const correctFlipCardsSet = document.flipCardsets.find(
        (flipSet) => flipSet.cardsId === flipCardSetId
      );
      setFlipcardSet(correctFlipCardsSet);
      setIsLoading(false);
    }

    if (flipcardSet) {
      navigation.setOptions({
        title: `${flipcardSet.flipCardsetName}'s flipcards`,
      });
    }
  }, [flipcardSet, document]);

  return (
    <ScrollView style={styles.container}>
      {!isLoading && flipcardSet && (
        <>
          <PlayComponent flipCardData={flipcardSet.flipcards} />

          <View style={styles.infos}>
            <Text style={styles.text}>
              {flipcardSet.flipcards.length} flipcards
            </Text>
          </View>
          <AddedFlipCards addedFlipcards={flipcardSet.flipcards} />
        </>
      )}

      {isLoading && !flipcardSet && (
        <View>
          <Text style={styles.text}>Loading...</Text>
        </View>
      )}

      {!isLoading && !flipcardSet && (
        <View style={styles.infos}>
          <Text style={styles.text}>No results 😅</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default FlipCardsViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allFlipcardsContainer: {
    marginTop: 12,
  },

  image: {
    height: 150,
    resizeMode: "cover",
  },

  infos: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "white",
  },

  title: {
    fontWeight: "900",
    fontSize: 24,
    fontStyle: "italic",
    textTransform: "capitalize",
  },
});
