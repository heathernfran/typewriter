export interface Book {
  key: string
  title: string
}

export interface Data {
  key: string
  name: string
  subject_type: string
  works_count: number
  works: Book[]
}
