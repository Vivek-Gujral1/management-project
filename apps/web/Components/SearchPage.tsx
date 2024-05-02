// SearchPage.js

import React, { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Perform search action, e.g., redirect to search results page
    console.log('Search for:', query);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <div className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
              Search
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Enter your search query"
              value={query}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div> */}

      <div className=' h-full w-full border border-white'>
<h1 className=' text-white'>dhfkkdsahnf</h1>
      </div>
    </div>
  );
};

export default SearchPage;
