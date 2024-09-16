'use client';

import { Character } from '@/types/Character';
import { useEffect, useState } from 'react';
import CharList from './components/CharList';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        'https://hp-api.herokuapp.com/api/characters'
      );
      const results = await response.json();
      setCharacters(results);
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl my-5 font-semibold py-4">
        The Dudes and Dudettes of Harry Potter
      </h1>
      <CharList characters={characters} />
    </div>
  );
}
