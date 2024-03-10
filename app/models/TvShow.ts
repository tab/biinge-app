import Realm, { BSON } from "realm"

export class TvShow extends Realm.Object<TvShow> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdbId!: number
  imdbId?: string
  title!: string
  posterPath!: string
  episodesCount!: number
  status!: string
  want!: boolean
  watching!: boolean
  watched!: boolean
  pin!: boolean
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvShowSchema = {
    name: "TvShow",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdbId: "double",
      imdbId: "string",
      title: { type: "string", indexed: true },
      posterPath: "string",
      episodesCount: "double",
      status: "string",
      want: "boolean",
      watching: "boolean",
      watched: "boolean",
      pin: "boolean",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
