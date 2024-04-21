
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import explorer from "../data/folderData";


const initialState = {
  explorerData: explorer,
  searchValue: '',
};

export const insertNode = createAsyncThunk(
    'explorer/insertNode',
    async ({ tree, id, value, isFolder }, { dispatch }) => {
      const insertRecursive = (node) => {
        if (node.id === id && node.isFolder) {
          const updatedItems = [
            {
              id: new Date().getTime(),
              name: value,
              isFolder: isFolder,
              items: [],
            },
            ...node.items,
          ];
          return { ...node, items: updatedItems };
        }
        const updatedItems = node.items.map(insertRecursive);
        return { ...node, items: updatedItems };
      };
      const updatedTree = insertRecursive(tree);
      dispatch(setExplorerData(updatedTree));
      return updatedTree;
    }
  );

  export const deleteNode = createAsyncThunk(
    'explorer/deleteNode',
    async ({ tree, id }, {dispatch }) => {
      const deleteRecursive = (node) => {
        if (node.id === id) {
          if (id === tree.id) {
            alert("You are not authorized to delete the root folder!!");
            return node;
          }
          return null;
        }
        const updatedItems = node.items.map(deleteRecursive).filter(Boolean);
        return { ...node, items: updatedItems };
      };
      const updatedTree = deleteRecursive(tree);
      dispatch(setExplorerData(updatedTree));
      return updatedTree;
    }
  );

export const renameNode = createAsyncThunk(
    'explorer/renameNode',
    async ({ tree, value, id, isFolder }, { dispatch }) => {
      const renameRecursive = (node) => {
        if (node.id === id) {
          return { ...node, name: value };
        }
        return { ...node, items: node.items.map(renameRecursive) };
      };
      const updatedTree = renameRecursive(tree);

      dispatch(setExplorerData(updatedTree));
      return updatedTree;
    }
  );

  export const searchFiles = createAsyncThunk(
    'explorer/searchFiles',
    async ({ tree, value }, { dispatch }) => {
      const searchRecursive = (node) => {
        let result = null;
        const searchDir = (childNode) => {
          if (childNode.name === value) {
            result = childNode;
          } else {
            childNode.items.forEach((item) => searchDir(item));
          }
        };
        searchDir(node);
        return result;
      };
      const searchResult = searchRecursive(tree);
      dispatch(setSearchValue(value));
      return searchResult;
    }
  );

const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    setExplorerData(state, action) {
      state.explorerData = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setExplorerData, setSearchValue } = explorerSlice.actions;

export default explorerSlice.reducer;
