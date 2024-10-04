import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SegmentFlatListItemProps {
  item: string;
}

const SegmentFlatListItem: React.FC<SegmentFlatListItemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.Image}></View>
      <View>
        <Text style={styles.Name}>Name</Text> */}
      <Text>{item}</Text>
      {/* </View> */}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  // Image: {
  //   backgroundColor: 'rgb(25,25,25)',
  //   borderColor: 'black',
  //   borderStyle: 'solid',
  //   borderWidth: 2,
  //   height: 40,
  //   width: 40,
  //   borderRadius: 9999,
  //   marginRight: 10,
  // },
  // Name: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
});
