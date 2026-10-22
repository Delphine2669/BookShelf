import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookPage.css";

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookP, setBookP] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedBook = localStorage.getItem("selectedBook");

      if (!savedBook) {
        setError("Book details not found. Please select a book again.");
        return;
      }

      const parsedBook = JSON.parse(savedBook);

      if (String(parsedBook.id) !== String(id)) {
        setError("The selected book does not match this page.");
        return;
      }

      setBookP(parsedBook);
    } catch {
      setError("Unable to read book details. Please select the book again.");
    }
  }, [id]);

  if (error) {
    return (
      <div className="book-page">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  if (!bookP) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-page">
      <button
        className="close-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ×
      </button>

      <h2>{bookP.title}</h2>

      {bookP.formats?.["image/jpeg"] && (
        <img
          src={bookP.formats["image/jpeg"]}
          alt={`Cover of ${bookP.title}`}
          className="ib-book-cover"
        />
      )}

      <p>
        <strong>Author(s):</strong>{" "}
        {bookP.authors?.map((author) => author.name).join(", ") || "Unknown"}
      </p>

      <p>
        <strong>Summary:</strong>{" "}
        {bookP.summaries?.[0] || "No summary available."}
      </p>

      <p>
        <strong>Languages:</strong> {bookP.languages?.join(", ") || "Unknown"}
      </p>

      <p>
        <strong>Downloads:</strong> {bookP.download_count ?? 0}
      </p>

      <h3>Download Links:</h3>

      <ul>
        {Object.entries(bookP.formats || {}).map(([format, url]) => (
          <li key={format}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {format}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
