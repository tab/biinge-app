import Realm from "realm"

import { Movie } from "models/Movie"

export class UserMovie extends Realm.Object<UserMovie> {
  _id!: string
  userId!: string
  want!: Realm.List<Movie>
  watched!: Realm.List<Movie>
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  UserMovieSchema = {
    name: "UserMovie",
    properties: {
      _id: "string",
      userId: "string",
      want: { type: "list", objectType: "Movie" },
      watched: { type: "list", objectType: "Movie" },
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
