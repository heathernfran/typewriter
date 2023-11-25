import { ChangeEventHandler, useId } from 'react'

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>
}

export function SearchInput({ handleChange }: Props) {
  const searchId = useId()

  return (
    <>
      <label htmlFor={searchId}>Subject:</label>
      <input id={searchId} name={searchId} onChange={handleChange} />
    </>
  )
}
