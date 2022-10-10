import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!show) {
    return null
  }

  if (books.loading || user.loading) {
    return <div>loading...</div>
  }

  const genre = user.data.ME.favoritegenre
  console.log(genre)
  const filteredBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(genre)
  )

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favourite genre <b>{genre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
