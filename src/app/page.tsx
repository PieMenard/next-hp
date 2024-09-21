'use client';

import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import CharList from './components/CharList';
import SearchBox from './components/SearchBox';
import AddChar from './components/AddChar';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState('');
  const [filteredChararacters, setFilteredCharacters] = useState<Character[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        'https://hp-api.herokuapp.com/api/characters'
      );
      const results = await response.json();
      setCharacters(results);
      setFilteredCharacters(results);
    };
    fetchCharacters();
  }, []);

  const handleSearch = async (query: string) => {
    const search = characters.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(search);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChararacters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredChararacters.length / itemsPerPage);

  return (
    <div className=" flex flex-col items-center">
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
      <CharList characters={currentItems} />

      {/* Pagination controls */}
      <div className="pagination mt-4 flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          Previous
        </button>
        {/* {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'font-bold' : ''}
          >
            {index + 1}
          </button>
        ))} */}
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
