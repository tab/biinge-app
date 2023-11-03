import Realm, { BSON } from "realm"

export class Movie extends Realm.Object<Movie> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdb_id!: number
  imdb_id!: string
  title!: string
  tagline!: string
  overview!: string
  backdrop_path!: string
  poster_path!: string
  homepage!: string
  popularity!: number
  status!: string
  release_date!: string
  vote_average!: number
  vote_count!: number
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  MovieSchema = {
    name: "Movie",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdb_id: "double",
      imdb_id: "string",
      title: { type: "string", indexed: true },
      tagline: "string",
      overview: "string",
      backdrop_path: "string",
      poster_path: "string",
      homepage: "string",
      popularity: "double",
      status: "string",
      release_date: "string",
      vote_average: "double",
      vote_count: "double",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
