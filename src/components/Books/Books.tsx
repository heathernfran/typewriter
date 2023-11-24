import { useId, useState } from 'react'
import { fetchData } from '../../api'
import type { Book, Data } from '../../types'

export function Books() {
  const [error, setError] = useState<Error | undefined>()
  const [results, setResults] = useState<Book[]>()
  const [search, setSearch] = useState('')

  const searchId = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = async () => {
    try {
      const data: Data = await fetchData(
        `https://openlibrary.org/subjects/${search}.json`,
      )
      setResults(data.works)
      setError(undefined)
    } catch (err) {
      setError(err as Error)
    }
  }

  const renderError = () => error && <div>Error occurred: {error.message}</div>

  const renderResults = () =>
    results && (
      <ul>
        {results.map((result) => (
          <li key={result.key}>{result.title}</li>
        ))}
      </ul>
    )

  return (
    <>
      <label htmlFor={searchId}>Search:</label>
      <input id={searchId} name={searchId} onChange={handleChange} />
      <button onClick={handleSearch}>Search for books</button>
      {renderError()}
      {renderResults()}
    </>
  )
}
