import Realm, { BSON } from "realm"

export class TvEpisode extends Realm.Object<TvEpisode> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  tmdb_id!: number
  tmdb_season_id!: number
  tmdb_show_id!: number
  title!: string
  air_date!: string
  runtime!: number
  vote_average!: number
  vote_count!: number
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  TvEpisodeSchema = {
    name: "TvEpisode",
    properties: {
      _id: "objectId",
      userId: "string",
      tmdb_id: "double",
      tmdb_season_id: "double",
      tmdb_show_id: "double",
      title: { type: "string", indexed: true },
      air_date: "string",
      runtime: "double",
      vote_average: "double",
      vote_count: "double",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
