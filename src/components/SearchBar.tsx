import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search species..."
        className="flex-grow border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-300 ease-in-out"
      >
        Search
      </button>
    </form>
  );
}
