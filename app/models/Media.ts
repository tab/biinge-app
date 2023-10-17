import Realm from "realm"

export class MediaListModel extends Realm.Object<MediaListModel> {
  name!: string

  MediaListSchema = {
    name: "MediaListModel",
    embedded: true,
    properties: {
      name: "string",
    },
  }
}

export class Media extends Realm.Object<Media> {
  id!: string
  title!: string
  image!: string
  contentRating!: string
  contentType!: string
  plot!: string
  star!: number
  year!: number
  want: boolean = false
  watched: boolean = false
  actors!: Realm.List<MediaListModel>
  directors!: Realm.List<MediaListModel>
  genres!: Realm.List<MediaListModel>
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  MediaSchema = {
    name: "Media",
    properties: {
      id: "string",
      title: "string",
      image: "string",
      contentRating: "string",
      contentType: "string",
      plot: "string",
      star: "float",
      year: "int",
      want: "boolean",
      watched: "boolean",
      actors: { type: "list", objectType: "MediaListModel" },
      directors: { type: "list", objectType: "MediaListModel" },
      genres: { type: "list", objectType: "MediaGenreModel" },
      createdAt: "date",
      updatedAt: "date",
    },
    primaryKey: "id",
  }

  static primaryKey = "id"
}
