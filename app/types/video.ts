import { EntityId } from "@reduxjs/toolkit"

export interface Video {
  id: EntityId
  name: string
  key: string
  published_at: string
}
