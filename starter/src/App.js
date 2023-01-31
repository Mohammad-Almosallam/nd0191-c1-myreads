import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import SearchPage from "./views/SearchPage";
import { useEffect, useState } from "react";
import { getAll } from "./api/BooksAPI";
import BookDetailsPage from "./views/BookDetailsPage";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  /**
   * The function is called when the component is mounted, and it fetches all the books from the server
   * and sets the state of the component to the books that were fetched
   */
  useEffect(() => {
    renderBooks();
  }, []);

  async function renderBooks() {
    const books = await getAll();
    setAllBooks(books);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MainPage books={allBooks} renderBooks={renderBooks} />}
          />
          <Route
            path="/search"
            element={<SearchPage books={allBooks} renderBooks={renderBooks} />}
          />
          <Route path="/bookDetails" element={<BookDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
