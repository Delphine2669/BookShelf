import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="searchbar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter a book title or an author"
          className="searchbarInput"
        />
        <button onClick={handleSearch} type="submit" className="submitButton">
          Search
        </button>
      </form>
    </div>
  );
}
