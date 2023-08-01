import {
  FlatList,
  StyleSheet,
} from 'react-native';

import CreatedFlipCard from '../UI-components/CreatedFlipCard';

function AddedFlipCards({ addedFlipcards, removeItem, editItem }) {
  const displayFlipcards = (data) => {
    return (
      <CreatedFlipCard
        flipcardData={data.item}
        deleteItem={removeItem}
        editItem={editItem}
      />
    );
  };

  return (
    <FlatList
      data={addedFlipcards}
      renderItem={displayFlipcards}
      style={styles.list}
    />
  );
}

export default AddedFlipCards;

const styles = StyleSheet.create({
  list: {
    padding: 6,
    margin: 5,
  },
});
