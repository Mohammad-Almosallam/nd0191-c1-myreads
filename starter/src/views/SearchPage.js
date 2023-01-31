import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../Components/Book";
import { update } from "../BooksAPI";

function SearchPage(props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    props.fillSearchedData(query);
  }, [query]);

  /**
   * The function takes in an event and a bookId, then filters the searchedBooks array to find the book
   * with the matching id, then updates the book's shelf value to the value of the event's target, then
   * renders the books
   * @param selectedOption - the selected shelf option
   * @param bookId - the id of the book that is being updated
   */

  async function handleChange(selectedOption, bookId) {
    const book = props.searchedBooks.filter((book) => book.id === bookId);
    await update(book[0], selectedOption.target.value);
    props.renderBooks();
  }

  /**
   * If the book is in the shelf, return the shelf it's in. If it's not, return the current shelf
   * @param currentShelf - the shelf that the book is currently on
   * @param bookId - The id of the book that is being searched for.
   * @returns the shelf status of the book.
   */

  function handleShelfStatus(currentShelf, bookId) {
    const book = props.books.find((book) => book.id === bookId);
    if (book) {
      return book.shelf;
    } else {
      return currentShelf;
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search"></Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {Array.isArray(props.searchedBooks) ? (
            props.searchedBooks.map((e, index) => {
              return (
                <li key={index}>
                  <Book
                    handleChange={handleChange}
                    bookTitle={e.title}
                    bookAuthors={e.authors}
                    currentShelf={handleShelfStatus(e.shelf, e.id)}
                    id={e.id}
                    img={e.imageLinks.smallThumbnail}
                  />
                </li>
              );
            })
          ) : (
            <h1>{props.searchedBooks}</h1>
          )}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
