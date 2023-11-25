import { ChangeEventHandler, useId } from 'react'

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleSearch: () => void
}

export function SearchInput({ handleChange, handleSearch }: Props) {
  const searchId = useId()

  return (
    <>
      <label htmlFor={searchId}>Subject:</label>
      <input id={searchId} name={searchId} onChange={handleChange} />
      <button onClick={handleSearch}>Search for books</button>
    </>
  )
}
