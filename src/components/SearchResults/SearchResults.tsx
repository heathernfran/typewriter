import type { Book } from '../../types'

interface Props {
  favourites: Book[]
  handleToggleFavourite: (book: Book) => void
  results: Book[]
}

export function SearchResults({
  favourites,
  handleToggleFavourite,
  results,
}: Props) {
  return (
    <>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.key}>
            {result.title}
            <button onClick={() => handleToggleFavourite(result)}>
              {favourites.includes(result)
                ? `Remove Favourite`
                : `Add Favourite`}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
