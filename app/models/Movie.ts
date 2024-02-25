import Realm, { BSON } from "realm"

export class Movie extends Realm.Object<Movie> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdb_id!: number
  imdb_id?: string
  title!: string
  tagline?: string
  overview!: string
  backdrop_path?: string
  poster_path!: string
  homepage?: string
  popularity!: number
  status!: string
  release_date!: string
  runtime?: number
  vote_average!: number
  vote_count!: number
  pin!: boolean
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  MovieSchema = {
    name: "Movie",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdb_id: "double",
      imdb_id: "string?",
      title: { type: "string", indexed: true },
      tagline: "string?",
      overview: "string",
      backdrop_path: "string?",
      poster_path: "string",
      homepage: "string?",
      popularity: "double",
      status: "string",
      release_date: "string",
      runtime: "double",
      vote_average: "double",
      vote_count: "double",
      pin: "boolean",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
