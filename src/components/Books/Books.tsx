import { useCallback, useState } from 'react'
import { fetchData } from '../../api'
import type { Book, Data } from '../../types'
import { FavouritesList } from '../FavouritesList'
import { SearchInput } from '../SearchInput'
import { SearchResults } from '../SearchResults/SearchResults'

export function Books() {
  const [error, setError] = useState<Error | undefined>()
  const [favourites, setFavourites] = useState<Book[]>([])
  const [results, setResults] = useState<Book[]>([])
  const [search, setSearch] = useState('')

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

  const handleToggleFavourite = useCallback((newFavourite: Book) => {
    setFavourites((previousState) => {
      if (previousState.includes(newFavourite)) {
        const copiedFavourites = previousState
        return [
          ...copiedFavourites.filter((favourite) => favourite !== newFavourite),
        ]
      } else {
        return [...previousState, newFavourite]
      }
    })
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold">Browse books by subject</h1>
      <SearchInput handleChange={handleChange} handleSearch={handleSearch} />
      <div className="grid grid-cols-2">
        {error ? (
          <div>Error occurred: {error.message}</div>
        ) : (
          <SearchResults
            favourites={favourites}
            handleToggleFavourite={handleToggleFavourite}
            results={results}
          />
        )}
        <FavouritesList favourites={favourites} />
      </div>
    </>
  )
}
