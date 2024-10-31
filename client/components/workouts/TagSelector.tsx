import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';

import SelectableTag from '../common/tag/SelectableTag';
import { useEffect, useState } from 'react';

type TagProps = {
  tags: WorkoutType[];
  onSelectionChange: (selectedTags: WorkoutType[]) => void;
  style?: ViewStyle;
};

const TagSelector = ({ tags, onSelectionChange, style }: TagProps) => {
  const selectableTags = [
    {
      tag_id: 0,
      name: 'All',
    },
    ...tags,
  ];
  const [selections, setSelections] = useState<boolean[]>(
    selectableTags.map(() => true),
  );

  const checkIfAllSelected = (arr: boolean[]) => {
    return arr.slice(1).every((isSelected) => isSelected);
  };

  const handleTagSelectionChange = (
    orderIndex: number,
    isSelected: boolean,
  ) => {
    let newSelections = [...selections];
    if (orderIndex === 0) {
      if (isSelected) {
        newSelections = selectableTags.map(() => true);
      } else {
        newSelections = selectableTags.map(() => false);
      }
    } else {
      newSelections[orderIndex] = isSelected;
      newSelections[0] = checkIfAllSelected(newSelections);
    }
    setSelections(newSelections);
    onSelectionChange(tags.filter((_, index) => newSelections.slice(1)[index]));
  };

  useEffect(() => {
    setSelections(selectableTags.map(() => true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        style={styles.list}
        data={selectableTags}
        renderItem={({ item, index }) => (
          <SelectableTag
            key={`tag${item.name}${index}`}
            orderIndex={index}
            value={item.name}
            size="l"
            onSelectionChange={handleTagSelectionChange}
            isSelected={selections[index]}
          />
        )}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TagSelector;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
});
