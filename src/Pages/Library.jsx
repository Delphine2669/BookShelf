import { useEffect, useState } from "react";
import "./Library.css";
export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLibrary = (url = "https://gutendex.com/books") => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setBooks(data.results.slice(0, 10));
        }
      })
      .catch(() => setError("Error fetching data"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchLibrary();
  }, []);
  return (
    <div className="l-container-div">
      <h2>Library</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="l-book-div">
        {books.map((book) => (
          <div key={book.id} className="l-div-id">
            <div className="l-div-book-cover">
              {book.formats["image/jpeg"] && (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="l-book-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}
