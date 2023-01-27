import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "../Components/Book";
import { update } from "../BooksAPI";

function SearchPage(props) {
  async function handleChange(e, bookId) {
    const book = props.books.filter((book) => book.id === bookId);
    await update(book[0], e.target.value);
    props.renderBooks();
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search"></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.books.map((e, index) => {
            return (
              <li key={index}>
                <Book
                  handleChange={handleChange}
                  bookTitle={e.title}
                  bookAuthors={e.authors}
                  currentShelf={e.shelf}
                  id={e.id}
                  img={e.imageLinks.smallThumbnail}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
