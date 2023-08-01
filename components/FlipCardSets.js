import React from "react";

import { FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import FlipCardPreview from "../UI-components/FlipCardPreview";

function FlipCardSets({ flipcardsData, languageSetId }) {
  const navigation = useNavigation();

  const bringToFlipCardSet = (id) => {
    navigation.navigate("FlipCardsViewer", {
      flipCardId: id,
      languageSetId: languageSetId,
    });
  };

  const displayFlipCard = (flipCard) => {
    return (
      <FlipCardPreview
        cardData={flipCard.item}
        pressedHandler={bringToFlipCardSet}
      />
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={flipcardsData}
      renderItem={displayFlipCard}
    />
  );
}

export default FlipCardSets;
