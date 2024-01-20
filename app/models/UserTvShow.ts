import Realm from "realm"

import { TvShow } from "models/TvShow"

export class UserTvShow extends Realm.Object<UserTvShow> {
  _id!: string
  userId!: string
  want!: Realm.List<TvShow>
  watching!: Realm.List<TvShow>
  watched!: Realm.List<TvShow>
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  UserTvShowSchema = {
    name: "UserTvShow",
    properties: {
      _id: "string",
      userId: "string",
      want: { type: "list", objectType: "TvShow" },
      watching: { type: "list", objectType: "TvShow" },
      watched: { type: "list", objectType: "TvShow" },
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
