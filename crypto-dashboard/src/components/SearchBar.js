import React, { useState, useEffect } from 'react';

const SearchBar = ({ cryptos, onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input.length > 0) {
      const filteredCryptos = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(input.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredCryptos);
    } else {
      setSuggestions([]);
    }
  }, [input, cryptos]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput('');
    setSuggestions([]);
  };

  return (
    <div className="relative mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search cryptocurrency..."
          className="border rounded px-3 py-2 w-full"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-lg w-full">
          {suggestions.map(crypto => (
            <li key={crypto.id} onClick={() => onSearch(crypto.name)} className="cursor-pointer p-2 hover:bg-gray-200">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
