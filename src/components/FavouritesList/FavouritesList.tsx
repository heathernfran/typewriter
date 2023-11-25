import type { Book } from '../../types'

interface Props {
  favourites: Book[]
}

export function FavouritesList({ favourites }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Favourites</h2>
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
    </div>
  )
}
