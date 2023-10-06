import Realm, { BSON } from "realm"

export class BacklogModel extends Realm.Object<BacklogModel> {
  _id: BSON.ObjectId = new BSON.ObjectId()

  mediaId!: string
  userId!: string
  state!: string

  createdAt: Date = new Date()

  static primaryKey = "_id"
}
