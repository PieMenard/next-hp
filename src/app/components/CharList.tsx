import { Character } from '@/types/Character';
import CharCard from './CharCard';

const CharList = ({ characters }: { characters: Character[] }) => {
  return (
    <div>
      <ul className="grid grid-cols-6">
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
