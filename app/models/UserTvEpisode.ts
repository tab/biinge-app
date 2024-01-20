import Realm from "realm"

import { TvEpisode } from "models/TvEpisode"

export class UserTvEpisode extends Realm.Object<UserTvEpisode> {
  _id!: string
  userId!: string
  watched!: Realm.List<TvEpisode>
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  UserTvEpisodeSchema = {
    name: "UserTvEpisode",
    properties: {
      _id: "string",
      userId: "string",
      watched: { type: "list", objectType: "TvEpisode" },
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
