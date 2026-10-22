import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import "./Books.css";
export default function Books() {
  const [books, setBooks] = useState([]);
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
  const openBookDetails = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));

    window.open(`/book-page/${book.id}`, "_blank");
  };

  return (
    <div>
      <h2>Books</h2>
      <SearchBar onSearch={fetchBooks} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {books.length > 0 && (
        <div className="ib-div-book">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => openBookDetails(book)}
              className="ib-div-id"
            >
              <div className="ib-div-title">{book.title}</div>

              {book.formats["image/jpeg"] && (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="ib-book-cover"
                />
              )}
              <div className="ib-div-author">
                {book.authors.map((a) => a.name).join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
