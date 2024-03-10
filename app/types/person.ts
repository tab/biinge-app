import { EntityId } from "@reduxjs/toolkit"

export interface PersonDetails {
  id: EntityId
  name: string
  tmdbId: number
  birthday: string
  profilePath: string
  gender: number
}

export interface CastPerson {
  id: EntityId
  gender: number
  name: string
  profilePath: string
  character: string
  type: string
}

export interface CrewPerson {
  id: EntityId
  gender: number
  name: string
  profilePath: string
  department: string
  job: string
  type: string
}
