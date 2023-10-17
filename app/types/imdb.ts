export interface SearchFormValues {
  query: string
}

export interface SearchResult {
  id: string
  title: string
  year: number
  type: string
  image: string
  image_large: string
  api_path: string
  imdb: string
}
