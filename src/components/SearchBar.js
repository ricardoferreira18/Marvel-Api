import React from 'react';


const SearchBar = ({ searchTerm }) => {
  return (
    <div className='ui icon fluid input'>
      <input
        placeholder='Search for your favorite super hero'
        type='text'
        onChange={(e) => searchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;