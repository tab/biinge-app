export interface RatingType {
  count: number
  star: number
}

export interface MovieType {
  id: string
  title: string
  image: string
  contentType: string
  plot: string
  rating: RatingType
  year: number
}
