export interface MovieType {
  id: string
  title: string
  image: string
  contentType: string
  plot: string
  rating: {
    count: number
    star: number
  }
  year: number
}
