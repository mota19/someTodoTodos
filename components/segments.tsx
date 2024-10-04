import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
        <View style={styles.inputAndAddList}>
          <TextInput
            style={styles.input}
            value={isAddingList ? newListName : inputValue}
            placeholder={isAddingList ? 'Enter new list name' : 'Enter an item'}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity
            onPress={() => setIsAddingList(!isAddingList)}
            style={styles.addListButton}>
            <Text style={styles.addListButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 'auto'},
          tabBarIndicatorStyle: {backgroundColor: '#007BFF'},
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          tabBarStyle: {backgroundColor: '#f0f0f0'},
        }}>
        {lists.map(list => (
          <Tab.Screen
            key={list.id}
            name={list.name}
            options={{tabBarLabel: list.name}}
            listeners={{
              tabPress: () => {
                dispatch(setActiveList(list.id));
              },
              focus: () => {
                console.log(`Swiped to list: ${list.name}`);
                dispatch(setActiveList(list.id));
              },
            }}>
            {() => (
              <FlatList
                style={styles.FlatListContainer}
                data={list.items}
                renderItem={({item}) => <SegmentFlatListItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <View>
                    <Text>No items available</Text>
                  </View>
                )}
              />
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
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
  inputAndAddList: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
    width: '90%',
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
    backgroundColor: 'gray',
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
  addListButton: {
    backgroundColor: '#28a745',
    borderRadius: 9999,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  addListButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
