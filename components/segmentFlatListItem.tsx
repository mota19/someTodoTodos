import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SegmentFlatListItemProps {
  item: string;
}

const SegmentFlatListItem: React.FC<SegmentFlatListItemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <Text>{item}</Text>
    </View>
  );
};

export default SegmentFlatListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'blue',
    width: 100,
    paddingHorizontal: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
