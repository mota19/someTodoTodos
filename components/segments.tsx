import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store/store';
import {
  changeInput,
  submit,
  setActiveList,
  addList,
} from '../Redux/slices/todoSlice';
import SegmentFlatListItem from './segmentFlatListItem';

const Segments: React.FC = () => {
  const {activeListId, lists} = useSelector((state: RootState) => state.todo);
  const activeList = lists.find(list => list.id === activeListId);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddingList, setIsAddingList] = useState<boolean>(false);
  const [newListName, setNewListName] = useState('');

  const inputValue = activeList?.inputValue || '';
  const items = activeList?.items || [];

  const handleInputChange = (text: string) => {
    if (!isAddingList) {
      if (activeListId) {
        dispatch(changeInput({id: activeListId, value: text}));
      }
    } else {
      setNewListName(text);
    }
  };

  const handleSubmit = () => {
    if (!isAddingList) {
      if (inputValue.trim() !== '') {
        dispatch(submit(activeListId));
        Keyboard.dismiss();
      }
    } else {
      if (newListName.trim() !== '') {
        dispatch(addList(newListName));
        setNewListName('');
        setIsAddingList(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={isAddingList ? newListName : inputValue}
          placeholder={isAddingList ? 'Enter new list name' : 'Enter an item'}
          onChangeText={handleInputChange}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={
            isAddingList
              ? {...styles.submit, backgroundColor: '#28a745'}
              : styles.submit
          }>
          <Text style={styles.submitText}>
            {isAddingList ? 'Add List' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.listSelector}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {lists.map(list => (
          <TouchableOpacity
            key={list.id}
            onPress={() => dispatch(setActiveList(list.id))}
            style={[
              styles.listButton,
              activeListId === list.id && styles.activeListButton,
            ]}>
            <Text style={styles.listButtonText}>{list.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setIsAddingList(!isAddingList)}
          style={styles.addListButton}>
          <Text style={styles.addListButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        style={styles.FlatListContainer}
        data={items}
        renderItem={({item}) => <SegmentFlatListItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Segments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  FlatListContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'gray',
  },
  listSelector: {
    maxHeight: 40,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  listButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  activeListButton: {
    backgroundColor: '#007BFF',
  },
  listButtonText: {
    color: '#000',
  },
  newListInput: {
    height: 40,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  addListButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  addListButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
