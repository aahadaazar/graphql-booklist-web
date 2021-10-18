import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client'
import { getBookDetails, getBooksQuery } from '../queries/queries'

function BookList() {
  const { data, loading } = useQuery(getBooksQuery);
  const [selectedBook, setSelectedBook] = useState('');
  const [loadGreeting, { loading: bookDetailLoading, data: bookDetail }] = useLazyQuery(
    getBookDetails,
  );
  const handleSingleBook = id => {
    loadGreeting(
      { variables: { id: selectedBook } });
  }

  useEffect(() => {
    if (selectedBook.trim() !== '' && !bookDetailLoading) {
      handleSingleBook(selectedBook);
    }
    // eslint-disable-next-line
  }, [selectedBook]);



  const handleBookDetailClick = (id) => {
    setSelectedBook(id);
  }

  const renderBookList = () => {
    if (loading) {
      return <h3>{'Books are being fetched!'}</h3>
    }
    return <ul className={'book-container-list'}>
      {data.books.map(o =>
        <li
          className={'book-container'}
          onClick={() => handleBookDetailClick(o.id)}
          key={o.id}>{o.name}
        </li>)}
    </ul>
  }


  return (
    <div className="BookListContainer">
      {renderBookList()}
      {
        bookDetail && bookDetail.book
          ? <div>
            <h3>{bookDetail.book.name}</h3>
            <h4>{'Written by: '}{bookDetail.book.author.name}</h4>
          </div>
          : <h3>{'No Book Selected'}</h3>
      }
    </div>
  )
}

export default BookList;

