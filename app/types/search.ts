export interface SearchFormValues {
  query: string
}

export interface SearchResult {
  id: number
  title: string
  poster_path: string
}

export type SearchResultListType = SearchResult[]
