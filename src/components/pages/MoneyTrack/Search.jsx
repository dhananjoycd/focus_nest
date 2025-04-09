/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ setResults, uid, type }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]); // Clear results if search is empty
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        if (!uid) {
          return setError(`Please make sure you are a valid user`);
        }
        if (!type || (type !== "earning" && type !== "expense")) {
          return setError(`Please make sure you are in a valid page`);
        }
        const response = await axios.get(
          // `https://focus-nest-server.vercel.app/api/money/search?q=${query}&uid=${uid}&type=${type}`
          `http://localhost:5000/api/money/search?q=${query}&uid=${uid}&type=${type}`
        );
        setResults(response.data);
        !response.data.length ? setError("No data Found") : setError(null);
      } catch (err) {
        setError("Failed to fetch transications");
      }
      setLoading(false);
    };

    const debounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [query, setResults]);

  return (
    <div className="flex justify-center items-center my-5">
      <div className="relative w-full max-w-lg">
        {/* Search Input with Icon */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter transactions by details, type, or amount"
          className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        {/* Loading State */}
        {loading && (
          <p className="text-center text-sm text-gray-600 mt-2">Searching...</p>
        )}
        {error && (
          <p className="text-center text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Search;
