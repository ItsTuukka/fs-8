import { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState()
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooksByGenre, booksByGenre] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    allBooks.data && setBooks(allBooks.data.allBooks)
  }, [allBooks.data])

  useEffect(() => {
    booksByGenre.data && setBooks(booksByGenre.data.allBooks)
  }, [booksByGenre.data])

  if (!props.show) {
    return null
  }

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(books.flatMap((book) => book.genres))]

  const handleGenre = (genres) => {
    setGenre(genre)
    getBooksByGenre({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{genre || 'all'}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleGenre(genre)}>
          {genre}
        </button>
      ))}
      <br />
      <button onClick={() => handleGenre('')}>all books</button>
    </div>
  )
}

export default Books
