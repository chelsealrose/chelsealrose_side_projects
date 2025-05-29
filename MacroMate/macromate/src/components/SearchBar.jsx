import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for ingredients or foods..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search foods"
      />
      <button type="submit">Search</button>
    </form>
  );
}
