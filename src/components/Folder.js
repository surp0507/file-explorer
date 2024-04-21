import React, {useState } from "react";

function Folder({ handleInsertNode = () => { }, handleDeleteNode = () => { }, handleRenameNode = () => { }, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
    inputValue: ""
  });


  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
      inputValue: ""
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleRenameFolder = (folderId) => {

    const newName = prompt("Enter the new name:");

    if (newName) {
      handleRenameNode(newName, folderId, showInput.isFolder)
    }
    }

  const handleDeleteFolder = (folderId) => {

    handleDeleteNode(folderId);
  }

  if (explorer?.isFolder) {

    return (
      <div style={{ marginTop: 5 }}>

        <div onClick={() => setExpand(!expand)} className="folder">

          <span>📁 {explorer.name}</span>

          <div >
            <button onClick={(e) => handleNewFolder(e, true)}>Create Folder</button>
            <button onClick={(e) => handleNewFolder(e, false)}>Create File</button>
            <button onClick={(e) => handleRenameFolder(explorer.id)}>Rename folder</button>
            <button onClick={() => handleDeleteFolder(explorer.id)}>Delete folder</button>

          </div>

        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"

                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => (
            <div key={exp.id} style={{ display: "flex", alignItems: "center" }}>

              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                explorer={exp}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="file">
          <div style={{ display: "flex", gap: 8 }}>
            <span>📄 {explorer?.name}</span>
            <button onClick={() => handleDeleteFolder(explorer.id)}>Delete file </button>
            <button onClick={(e) => handleRenameFolder(explorer.id)} >Rename file </button>
          </div>


        </div>
      </div>
    );
  }
}

export default Folder;
