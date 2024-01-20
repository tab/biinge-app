import Realm from "realm"

import { TvSeason } from "models/TvSeason"

export class UserTvSeason extends Realm.Object<UserTvSeason> {
  _id!: string
  userId!: string
  watched!: Realm.List<TvSeason>
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  UserTvSeasonSchema = {
    name: "UserTvSeason",
    properties: {
      _id: "string",
      userId: "string",
      watched: { type: "list", objectType: "TvSeason" },
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
