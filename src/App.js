import React, { useState } from 'react';
import './App.css';

export default function Component() {
  const [input, setInput] = useState('{"data":["M","1","334","4","B","e","d"]}');
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState('numbers');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(input);
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: error.message });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredResponse = () => {
    if (!result) return '';

    if (result.error) {
      return `Error: ${result.error}`;
    }

    switch (filter) {
      case 'numbers':
        return `Numbers: ${result.numbers.join(', ')}`;
      case 'alphabets':
        return `Alphabets: ${result.alphabets.join(', ')}`;
      case 'highest':
        return `Highest Lowercase Alphabet: ${result.highest_lowercase_alphabet.join(', ')}`;
      default:
        return '';
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">API Input</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          aria-label="API Input"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      <div className="mb-4">
        <label htmlFor="filter" className="block mb-2 font-semibold">Multi Filter</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="highest">Highest Alphabet</option>
        </select>
      </div>
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Filtered Response</h2>
          <p>{getFilteredResponse()}</p>
        </div>
      )}
    </div>
  );
}
