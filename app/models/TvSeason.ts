import Realm, { BSON } from "realm"

export class TvSeason extends Realm.Object<TvSeason> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdb_id!: number
  tmdb_show_id!: number
  title!: string
  number!: number
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvSeasonSchema = {
    name: "TvSeason",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdb_id: "double",
      tmdb_show_id: "double",
      title: { type: "string", indexed: true },
      number: "double",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
