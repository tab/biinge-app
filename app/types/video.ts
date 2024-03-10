import { EntityId } from "@reduxjs/toolkit"

export interface Video {
  id: EntityId
  tmdbId: number
  name: string
  key: string
  publishedAt: string
}
