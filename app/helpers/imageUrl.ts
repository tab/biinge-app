import { TMDBPosterSizeType } from "types"
import { TMDB_IMAGE_URL } from "config"

function imageUrl(size: TMDBPosterSizeType, path: string) {
  return `${TMDB_IMAGE_URL}/${size}${path}`
}

export { imageUrl }
