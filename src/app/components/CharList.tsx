import { Character } from '@/types/Character';
import CharCard from './CharCard';

const CharList = ({ characters }: { characters: Character[] }) => {
  return (
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((char) => (
          <li key={char.id}>
            <CharCard character={char} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharList;
