import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import SearchPage from "./views/SearchPage";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
