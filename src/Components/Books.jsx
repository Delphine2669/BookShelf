import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import "./Books.css";
export default function Books() {
  const [books, setBooks] = useState([]); // Ensure books is always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    fetch(`https://gutendex.com/books?search=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (
          data.results &&
          Array.isArray(data.results) &&
          data.results.length > 0
        ) {
          setBooks(data.results);
        } else {
          setBooks([]); // Prevents errors
          setError("No books found");
        }
      })
      .catch(() => {
        setBooks([]); // Prevents errors on fetch failure
        setError("Error fetching data");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2>Books</h2>
      <SearchBar onSearch={fetchBooks} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {books.length > 0 && (
        <div>
          {books.map((book) => (
            <div key={book.id} className="div-id">
              <div className="div-title">{book.title}</div>
              <div className="div-author">
                {book.authors.map((a) => a.name).join(", ")}
              </div>
              {book.formats["image/jpeg"] && (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="book-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
