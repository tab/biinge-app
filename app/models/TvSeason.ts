import Realm, { BSON } from "realm"

export class TvSeason extends Realm.Object<TvSeason> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdbId!: number
  tmdbShowId!: number
  title!: string
  number!: number
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvSeasonSchema = {
    name: "TvSeason",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdbId: "double",
      tmdbShowId: "double",
      title: { type: "string", indexed: true },
      number: "double",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
