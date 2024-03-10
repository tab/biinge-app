import Realm, { BSON } from "realm"

export class Profile extends Realm.Object<Profile> {
  _id: BSON.ObjectId = new BSON.ObjectId()
  userId!: string
  appearance!: string
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  ProfileSchema = {
    name: "Profile",
    properties: {
      _id: "objectId",
      userId: "string",
      appearance: "string",
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "_id",
  }

  static primaryKey = "_id"
}
