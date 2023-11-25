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
    <div>
      <h2 className="text-2xl font-bold">Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.key}>
            <button onClick={() => handleToggleFavourite(result)}>
              {favourites.includes(result)
                ? `Remove Favourite`
                : `Add Favourite`}
            </button>
            {result.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
