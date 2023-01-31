import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { get } from "../api/BooksAPI";
function BookDetailsPage() {
  const [bookDetails, setBookDetails] = useState({});

  const loc = useLocation();
  const { mappedFromSearchPage, bookId } = loc.state;

  useEffect(() => {
    const books = async () => {
      setBookDetails(await get(bookId));
    };
    books();
  }, [bookId]);
  return (
    <div>
      <Link
        className="back-btn"
        to={mappedFromSearchPage === true ? "/search" : "/"}
      >
        {mappedFromSearchPage === true
          ? "< Back to search page"
          : "< Back to main page"}
      </Link>
      <div>
        <div>
          <h1>{bookDetails.title}</h1>
          <h2>
            {bookDetails.shelf +
              " • " +
              bookDetails.pageCount +
              " pages" +
              " • " +
              bookDetails.language}
          </h2>
          <h3>authors: {bookDetails.authors}</h3>
          <h2>Description:</h2>
          <h4 className="limit-words">{bookDetails.description}</h4>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
