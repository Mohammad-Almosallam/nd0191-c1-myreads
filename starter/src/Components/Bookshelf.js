import React, { useState } from "react";
import Book from "./Book";
import { update } from "../BooksAPI";

function Bookshelf(props) {
  async function handleChange(e, bookId) {
    console.log("before");
    const book = props.books.filter((book) => book.id === bookId);
    console.log("Filtered");
    await update(book[0], e.target.value);
    console.log("done");
    props.refreshUpdates();
    console.log("refresh");
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
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

export default Bookshelf;
