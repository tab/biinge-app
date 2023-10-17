export interface CreditType {
  name: string
  value: string[]
}

export interface EpisodeType {
  idx: number
  no: string
  title: string
  image: string
  plot: string
  publishedDate: string
  star: number
}

export interface SeasonType {
  id: string
  name: string
  api_path: string
  episodes?: EpisodeType[]
}

export interface ImdbResultType {
  id: string
  title: string
  image: string
  contentType: string
  contentRating: string
  plot: string
  rating: {
    count: number
    star: number
  }
  genre: string[]
  year: number
  actors: string[]
  directors: string[]
  top_credits: CreditType[]
  seasons?: SeasonType[]
}

type MediaDataListType = {
  name: string
}

export interface MediaType {
  id: string
  title: string
  image: string
  contentRating?: string
  contentType: string
  plot: string
  star: number
  year: number
  want: boolean
  watched: boolean
  actors: MediaDataListType[]
  directors: MediaDataListType[]
  genres: MediaDataListType[]
  seasons?: SeasonType[]
  createdAt: Date
  updatedAt: Date
}
