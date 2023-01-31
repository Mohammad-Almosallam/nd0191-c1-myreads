import React, { useEffect, useState } from "react";
import Bookshelf from "../Components/Bookshelf";
import { Link } from "react-router-dom";

function MainPage(props) {
  /**
   * It takes a shelf name as an argument and returns an array of books that are on that shelf
   * @param shelfName - the name of the shelf you want to filter by
   * @returns The filtered array of books.
   */
  function filterBooksByShelf(shelfName) {
    const filtered = props.books.filter((book) => book.shelf === shelfName);
    return filtered;
  }

  function refreshUpdates() {
    props.renderBooks();
  }

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf
            refreshUpdates={refreshUpdates}
            books={filterBooksByShelf("currentlyReading")}
            shelfTitle={"Currently Reading"}
          />
          <Bookshelf
            refreshUpdates={refreshUpdates}
            books={filterBooksByShelf("wantToRead")}
            shelfTitle={"Want to Read"}
          />
          ;
          <Bookshelf
            refreshUpdates={refreshUpdates}
            books={filterBooksByShelf("read")}
            shelfTitle={"Read"}
          />
          ;
        </div>
        <Link to={"/search"} className="open-search" />
      </div>
    </div>
  );
}

export default MainPage;
