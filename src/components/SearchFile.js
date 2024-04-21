import React from 'react';

const SearchFile = ({ onChange, findDir }) => {
  return (
    <div style={{ textAlign: "left" }}>
      <h2 style={{ textAlign: "center" }}>File Explorer</h2>
      <input
        label="Search..."
        variant="outlined"
        placeholder='search here...'

        onChange={(e) => onChange(e)}
        style={{ marginBottom: "20px", padding: 10, marginRight: 5 }}
      />
      <button variant="contained" onClick={findDir} style={{ marginTop: 8, padding: 10, width: "90px" }}>Search</button>
    </div>
  );
}

export default SearchFile;
