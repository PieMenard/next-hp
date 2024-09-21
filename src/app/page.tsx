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
      <CharList characters={filteredChararacters} />
    </div>
  );
}
