import Realm, { BSON } from "realm"

export class Movie extends Realm.Object<Movie> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdbId!: number
  imdbId?: string
  title!: string
  posterPath!: string
  runtime?: number
  want!: boolean
  watched!: boolean
  pin!: boolean
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  MovieSchema = {
    name: "Movie",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdbId: "double",
      imdbId: "string",
      title: { type: "string", indexed: true },
      posterPath: "string",
      runtime: "double",
      want: "bool",
      watched: "bool",
      pin: "bool",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
