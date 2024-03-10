import { EntityId } from "@reduxjs/toolkit"

export interface TrendingResult {
  id: EntityId
  tmdbId: number
  title: string
  posterPath: string
}

export type TrendingListType = TrendingResult[]
