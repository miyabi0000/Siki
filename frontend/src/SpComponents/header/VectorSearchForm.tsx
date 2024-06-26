import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrSearch } from "react-icons/gr";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form className='relative w-full max-w-lg bg-gray-400 rounded-full overflow-hidden' onSubmit={handleSearch}>
      <input
        type="text"
        className="w-full h-10 pl-4 pr-10 text-base bg-transparent focus:outline-none"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search"
      />
      <button type="submit" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-white bg-transparent hover:text-gray-300 transition duration-300" aria-label="Submit search">
        <GrSearch />
      </button>
    </form>
  );
};

export default SearchForm;
