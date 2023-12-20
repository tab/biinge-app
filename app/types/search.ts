import { EntityId } from "@reduxjs/toolkit"

export interface SearchFormValues {
  query: string
}

export interface SearchResult {
  id: EntityId
  title: string
  poster_path: string
}

export type SearchResultListType = SearchResult[]
