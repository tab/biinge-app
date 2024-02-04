import { EntityId } from "@reduxjs/toolkit"

export interface PersonDetails {
  id: EntityId
  name: string
  biography: string
  birthday: string
  popularity: number
  profile_path: string
  gender: number
  imdb_id: string
}

export interface CastPerson {
  id: EntityId
  gender: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  order: number
  type: string
}

export interface CrewPerson {
  id: EntityId
  gender: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  department: string
  job: string
  type: string
}
