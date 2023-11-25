import { useCallback, useId, useState } from 'react'
import { fetchData } from '../../api'
import type { Book, Data } from '../../types'

export function Books() {
  const [error, setError] = useState<Error | undefined>()
  const [favourites, setFavourites] = useState<Book[]>([])
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

  const handleAddFavourite = useCallback((newFavourite: Book) => {
    setFavourites((previousState) => {
      if (previousState.includes(newFavourite)) {
        const copiedSelectedItems = previousState
        return [...copiedSelectedItems.filter((item) => item !== newFavourite)]
      } else {
        return [...previousState, newFavourite]
      }
    })
  }, [])

  const renderError = () => error && <div>Error occurred: {error.message}</div>

  const renderResults = () =>
    results && (
      <ul>
        {results.map((result) => (
          <li key={result.key}>
            {result.title}
            <button onClick={() => handleAddFavourite(result)}>
              {favourites.includes(result)
                ? `Remove Favourite`
                : `Add Favourite`}
            </button>
          </li>
        ))}
      </ul>
    )

  const renderFavourites = () =>
    favourites && (
      <>
        <h2>Favourites</h2>
        <ul>
          {favourites.map((favourite) => (
            <li key={favourite.key}>
              {favourite.title.split('').map((char, charIndex) => (
                <span
                  key={`${favourite.title}_${charIndex}`}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s forwards ${charIndex * 0.5}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </>
    )

  return (
    <>
      <label htmlFor={searchId}>Search:</label>
      <input id={searchId} name={searchId} onChange={handleChange} />
      <button onClick={handleSearch}>Search for books</button>
      {renderError()}
      {renderResults()}
      {renderFavourites()}
    </>
  )
}
