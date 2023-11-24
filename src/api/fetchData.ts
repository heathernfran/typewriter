export async function fetchData<Type>(url: string): Promise<Type> {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error(String(error))
    }
  }
}
