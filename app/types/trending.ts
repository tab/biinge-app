import { EntityId } from "@reduxjs/toolkit"

export interface TrendingResult {
  id: EntityId
  tmdb_id: number
  title: string
  poster_path: string
}

export type TrendingListType = TrendingResult[]
