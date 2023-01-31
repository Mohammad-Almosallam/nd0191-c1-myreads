import React from "react";
import { Link } from "react-router-dom";

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.img})`,
            backgroundPosition: "center",
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={props.currentShelf}
            onChange={(e) => {
              props.handleChange(e, props.id);
            }}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookTitle}</div>
      <div className="book-authors">{props.bookAuthors}</div>
      <Link
        to="/bookDetails"
        state={{
          firedFromSearchPage: props.mappedFromSearchPage,
          bookId: props.id,
        }}
      >
        <button className="book-read-more">Read more</button>
      </Link>
    </div>
  );
}

export default Book;
