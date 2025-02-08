import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'; // Import the CSS file

const SearchBar = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search"
        className="search-box"
      />
      <button type="submit" className="search-button">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
