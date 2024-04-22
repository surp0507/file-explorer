import React, { useEffect, useState } from "react";
import Folder from "./components/Folder";
import "./styles.css";
import { useSelector, useDispatch } from 'react-redux';
import SearchFile from "./components/SearchFile";
import explorer from "./data/folderData";
import { setExplorerData, insertNode, deleteNode, renameNode, searchFiles } from './redux/explorerSlice';

export default function App() {
  const [searchValue, setSearchValue] = useState("")
  const explorerData = useSelector((state) => state.explorer.explorerData);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(setExplorerData(explorer))
  }, [searchValue])


  const handleInsertNode = (folderId, item, isFolder) => {
    dispatch(insertNode({ tree: explorerData, id: folderId, value: item, isFolder }))
      .then((finalTree) => {
        console.log(finalTree.payload, "finalTree")
        dispatch(setExplorerData(finalTree.payload));
      });
  };

  const handleRenameNode = (newName, nodeId, isFolder) => {
    dispatch(renameNode({ tree: explorerData, value: newName, id: nodeId, isFolder }))
      .then((finalTree) => {
        console.log(finalTree.payload, "final gtre")
        dispatch(setExplorerData(finalTree.payload));
      });
  };

  const handleSearch = (e) => {

    setSearchValue(e.target.value)
  };

  const handleDeleteNode = (nodeId) => {
    dispatch(deleteNode({ tree: explorerData, id: nodeId }))
      .then((finalTree) => {
        dispatch(setExplorerData(finalTree.payload));
      });
  };

  const findDir = () => {
    dispatch(searchFiles({ tree: explorerData, value: searchValue }))
      .then((finalTree) => {
        if (!finalTree.payload) {
          alert("file doesn't exist!")
          dispatch(setExplorerData(explorerData));
        } else {
          dispatch(setExplorerData(finalTree.payload));
        }

      });
 }

  return (
    <div className="App">
      <SearchFile onChange={handleSearch} findDir={findDir} />
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorer={explorerData}
      />
    </div>
  );
}
