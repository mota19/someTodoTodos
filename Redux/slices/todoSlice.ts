import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoList {
  id: string;
  name: string;
  items: string[];
  inputValue: string;
}

interface TodoState {
  lists: TodoList[];
  activeListId: string | null;
}

const initialState: TodoState = {
  lists: [
    {
      id: '1',
      name: 'Default List',
      items: [],
      inputValue: '',
    },
  ],
  activeListId: '1',
};


const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeInput: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const { id, value } = action.payload;
      const list = state.lists.find(list => list.id === id);
      if (list) {
        list.inputValue = value;
      }
    },
    submit: (state, action: PayloadAction<string>) => {
      const listId = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list && list.inputValue.trim() !== '') {
        list.items.push(list.inputValue);
        list.inputValue = '';
      }
    },
    setActiveList: (state, action: PayloadAction<string>) => {
      state.activeListId = action.payload;
    },
    addList: (state, action: PayloadAction<string>) => {
      const newList: TodoList = {
        id: new Date().toISOString(),
        name: action.payload,
        items: [],
        inputValue: '',
      };
      state.lists.push(newList);
      state.activeListId = newList.id;
    },
    deleteItem: (state, action: PayloadAction<{ id: string; index: number }>) => {
      const { id, index } = action.payload;
      const list = state.lists.find(list => list.id === id);
      if (list) {
        list.items.splice(index, 1);
      }
    },
    updateItem: (state, action: PayloadAction<{ id: string; index: number }>) => {
      const { id, index } = action.payload;
      const list = state.lists.find(list => list.id === id);
      if (list) {
        list.inputValue = list.items[index];
      }
    },
  },
});

export const { changeInput, submit, setActiveList, addList, deleteItem, updateItem } = todoSlice.actions;

export default todoSlice.reducer;
