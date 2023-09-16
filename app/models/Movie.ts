import Realm, { BSON } from "realm"

export class Movie extends Realm.Object<Movie> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  id!: string
  title!: string
  image!: string
  contentType!: string
  plot!: string
  rating!: {
    count: number
    star: number
  }
  year!: number

  static primaryKey = "_id"
}
