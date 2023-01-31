import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import SearchPage from "./views/SearchPage";
import { useEffect, useState } from "react";
import { getAll, search } from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);

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

  /**
   * It takes in a query string, calls the search function, and sets the state of the searchedBooks to
   * the books found
   * @param query - The search query that the user types in the search bar
   */

  async function fillSearchedData(query) {
    if (query !== "") {
      const booksFound = await search(query);
      //Checks if books found are of type Array, because if no books are found the returned value is an Object type
      if (Array.isArray(booksFound)) {
        setSearchedBooks(booksFound);
      } else {
        //In case no books were found from the API call
        setSearchedBooks("Book not found");
      }
    } else {
      //Resets the books when user deletes query
      setSearchedBooks("");
    }
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
            element={
              <SearchPage
                books={allBooks}
                searchedBooks={searchedBooks}
                fillSearchedData={fillSearchedData}
                renderBooks={renderBooks}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
