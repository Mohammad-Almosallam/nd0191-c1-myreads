import React from "react";
import Book from "./Book";
import { update } from "../api/BooksAPI";

function Bookshelf(props) {
  async function handleChange(e, bookId) {
    const book = props.books.filter((book) => book.id === bookId);
    await update(book[0], e.target.value);
    props.refreshUpdates();
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
                  img={
                    e.imageLinks === undefined
                      ? require("../icons/notFound.png")
                      : e.imageLinks.smallThumbnail
                  }
                  mappedFromSearchPage={false}
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
