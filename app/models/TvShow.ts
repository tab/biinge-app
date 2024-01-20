import Realm, { BSON } from "realm"

export class TvShow extends Realm.Object<TvShow> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdb_id!: number
  title!: string
  tagline?: string
  overview!: string
  backdrop_path?: string
  poster_path!: string
  homepage?: string
  popularity!: number
  status!: string
  release_date!: string
  vote_average!: number
  vote_count!: number
  number_of_seasons!: number
  number_of_episodes!: number
  pin!: boolean
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvShowSchema = {
    name: "TvShow",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdb_id: "double",
      title: { type: "string", indexed: true },
      tagline: "string?",
      overview: "string",
      backdrop_path: "string?",
      poster_path: "string",
      homepage: "string?",
      popularity: "double",
      status: "string",
      release_date: "string",
      vote_average: "double",
      vote_count: "double",
      number_of_seasons: "double",
      number_of_episodes: "double",
      pin: "boolean",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
