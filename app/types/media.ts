export interface RatingType {
  count: number
  star: number
}

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

export type EpisodesType = EpisodeType[]

export interface SeasonType {
  id: string
  name: string
  api_path: string
  episodes?: EpisodesType
}

export type SeasonsType = SeasonType[]

export interface ImdbResultType {
  id: string
  title: string
  image: string
  contentType: string
  plot: string
  rating: RatingType
  contentRating: string
  genre: string[]
  year: number
  actors: string[]
  directors: string[]
  top_credits: CreditType[]
  seasons?: SeasonsType
}

export interface MediaType {
  id: string
  title: string
  image: string
  contentType: string
  plot: string
  star: number
  contentRating: string
  genre: string[]
  year: number
  want: boolean
  watched: boolean
  actors: string[]
  directors: string[]
  top_credits: CreditType[]
  seasons?: SeasonsType
  createdAt: string
}

export interface BacklogType {
  _id: string
  state: string
  mediaId: string
  userId: string
  createdAt: string
}

export type BacklogListType = BacklogType[]
