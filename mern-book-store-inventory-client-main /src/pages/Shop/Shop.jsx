import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  // fetching data
  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [loading]);

  // loader
  if (loading) {
    return (
      <div className="mt-28 text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }
  const handleBuyNowClick = (bookPDFURL) => {
    window.open(bookPDFURL, "_blank");
  };
  return (
    <div className="my-28 px-4 lg:px-24">
      <h2 className="z-40 mb-16 text-center text-3xl font-bold">
        All Books are Available Here
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Card key={book.id}>
            {" "}
            {/* Assuming book.id is a unique identifier */}
            <img src={book.imageURL} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order....
            </p>
            <button
              onClick={() => handleBuyNowClick(book.bookPDFURL)}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
