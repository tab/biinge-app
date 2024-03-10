export interface SearchFormValues {
  query: string
}

export interface SearchResult {
  id: number
  tmdbId: number
  title: string
  posterPath: string
}

export type SearchResultListType = SearchResult[]
