import { useEffect, useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('app-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notify errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'}
          authors={authors.data.allAuthors}
          token={token}
        />

        <Books show={page === 'books'} />

        <LoginForm
          show={page === 'login'}
          setError={notify}
          setToken={setToken}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        token={token}
      />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
