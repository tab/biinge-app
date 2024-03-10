import Realm, { BSON } from "realm"

export class TvEpisode extends Realm.Object<TvEpisode> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdbId!: number
  tmdbSeasonId!: number
  tmdbShowId!: number
  title!: string
  runtime!: number
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvEpisodeSchema = {
    name: "TvEpisode",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdbId: "double",
      tmdbSeasonId: "double",
      tmdbShowId: "double",
      title: { type: "string", indexed: true },
      runtime: "double",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
