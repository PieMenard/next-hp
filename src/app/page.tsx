'use client';

import { useEffect, useState } from 'react';
import CharList from './components/CharList';
import SearchBox from './components/SearchBox';
import AddChar from './components/AddChar';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 10; // Number of items per page

  // Fetch characters based on search query and pagination
  const fetchCharacters = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      name: query, // Add search query to params
    });

    try {
      const response = await fetch(`/api/characters?${params}`);
      const result = await response.json();

      if (result.success) {
        setCharacters(result.data.results);
        setTotalResults(result.data.totalCount);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  // Fetch characters when the component mounts and when query or page changes
  useEffect(() => {
    fetchCharacters();
  }, [query, currentPage]);

  // Handle search
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-xl my-5 font-semibold py-4">
        The Dudes and Dudettes of Harry Potter
      </h1>
      <div className="flex gap-4">
        <SearchBox
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
        <AddChar />
      </div>
      <CharList characters={characters} />

      {/* Pagination Controls */}
      <div className="pagination mt-4 flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
