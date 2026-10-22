import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Components/Books";
import BookPage from "./Components/BookPage";
import Library from "./Pages/Library";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book-page/:id" element={<BookPage />} />
        </Routes>
      </Router>
      <Library />
    </>
  );
}

export default App;
