import { FormEvent } from 'react';

type SearchBoxProps = {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
};

const SearchBox = ({ query, setQuery, handleSearch }: SearchBoxProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="border-2 rounded-md px-3 py-1"
        />
        <button
          type="submit"
          className="px-2 border-2 rounded-md py-1 bg-slate-200 mx-1"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
