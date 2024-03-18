import { createAsyncThunk } from "@reduxjs/toolkit"
import { parseISO } from "date-fns"

import { TMDB_API, LANG } from "redux/api/tmdb"
import {
  TMDBMovieResult,
  TMDBTvResult,
  TMDBPersonResult,
  TMDBMovieCast,
  TMDBMovieCrew,
  TMDBVideo,
  TMDBPersonCast,
  TMDBPersonCrew,
  TMDBTvSeason,
  TMDBTvEpisode,
  TMDBTvCast,
  TMDBTvCrew,
  TMDBRecommendation,
  TMDB_JOB_DIRECTOR,
  TMDB_TRAILER_TYPE,
  TMDB_YOUTUBE_TYPE,
  TMDB_TV_EXCLUDED_GENRE_IDS,
  TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY,
  TMDB_JOB_SCREENPLAY,
  TMDB_JOB_WRITER,
} from "types"

const uniqById = <T extends { id: number }>(items: T[]): T[] => {
  const seen = new Set<number>()
  return items.filter((item) => {
    const itemId = item.id
    if (!seen.has(itemId)) {
      seen.add(itemId)
      return true
    }
    return false
  })
}

const filterMovieCredits = (
  items: (TMDBMovieCast | TMDBMovieCrew)[],
): any[] => {
  return items
    .filter(({ adult }: TMDBMovieCast | TMDBMovieCrew) => !adult)
    .filter(({ poster_path }: TMDBMovieCast | TMDBMovieCrew) => poster_path)
    .filter(({ release_date }: TMDBMovieCast | TMDBMovieCrew) => release_date)
    .sort(
      (a: TMDBMovieCast | TMDBMovieCrew, b: TMDBMovieCast | TMDBMovieCrew) => {
        return (
          parseISO(b.release_date).getTime() -
          parseISO(a.release_date).getTime()
        )
      },
    )
    .map(
      ({
        id,
        poster_path,
        title,
        job,
        character,
      }: TMDBMovieCast | TMDBMovieCrew) => {
        return {
          id,
          tmdbId: id,
          title,
          posterPath: poster_path,
          type: job ? job : character,
        }
      },
    )
}

const filterTvCredits = (items: (TMDBTvCast | TMDBTvCrew)[]): any[] => {
  return items
    .filter(({ adult }: TMDBTvCast | TMDBTvCrew) => !adult)
    .filter(({ poster_path }: TMDBTvCast | TMDBTvCrew) => poster_path)
    .filter(({ first_air_date }: TMDBTvCast | TMDBTvCrew) => first_air_date)
    .filter(
      ({ genre_ids }: TMDBTvCast | TMDBTvCrew) =>
        genre_ids.length !== 0 &&
        TMDB_TV_EXCLUDED_GENRE_IDS.every(
          (genreId: number) => !genre_ids.includes(genreId),
        ),
    )
    .sort((a: TMDBTvCast | TMDBTvCrew, b: TMDBTvCast | TMDBTvCrew) => {
      return (
        parseISO(b.first_air_date).getTime() -
        parseISO(a.first_air_date).getTime()
      )
    })
    .map(
      ({ id, poster_path, name, episode_count }: TMDBTvCast | TMDBTvCrew) => {
        return {
          id,
          tmdbId: id,
          title: name,
          posterPath: poster_path,
          episodesCount: episode_count,
        }
      },
    )
}

// NOTE: Movie screen
export const movieDetails = createAsyncThunk(
  "tmdb/movie/details",
  async (movieId: number) => {
    const response = await TMDB_API.get(
      `/movie/${movieId}?language=${LANG}&append_to_response=credits,recommendations,videos`,
    )

    const {
      title,
      overview,
      poster_path,
      status,
      imdb_id,
      release_date,
      runtime,
      vote_average,
      credits,
      videos,
      recommendations,
    } = response.data

    const filteredCast = credits.cast
      .filter(({ profile_path }: TMDBPersonCast) => profile_path)
      .map(({ id, profile_path, name, character }: TMDBPersonCast) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: character,
        }
      })

    const filteredDirector = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) => [TMDB_JOB_DIRECTOR].includes(job))
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredCrew = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) =>
        [
          TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY,
          TMDB_JOB_SCREENPLAY,
          TMDB_JOB_WRITER,
        ].includes(job),
      )
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredRecommendations = recommendations.results
      .filter(({ poster_path }: TMDBRecommendation) => poster_path)
      .map(({ id, title, poster_path }: TMDBRecommendation) => {
        return {
          id,
          tmdbId: id,
          title,
          posterPath: poster_path,
        }
      })

    const filteredVideos = videos.results
      .filter(({ official }: TMDBVideo) => official)
      .filter(({ site }: TMDBVideo) => site === TMDB_YOUTUBE_TYPE)
      .filter(({ type }: TMDBVideo) => type === TMDB_TRAILER_TYPE)
      .map(({ id, name, key, published_at }: TMDBVideo) => {
        return {
          id,
          tmdbId: id,
          name,
          key,
          publishedAt: published_at,
        }
      })

    return {
      id: movieId,
      title,
      overview,
      posterPath: poster_path,
      status,
      imdbId: imdb_id,
      releaseDate: release_date,
      runtime,
      rating: vote_average,
      credits: uniqById([
        ...filteredDirector,
        ...filteredCast,
        ...filteredCrew,
      ]),
      recommendations: filteredRecommendations,
      videos: filteredVideos,
    }
  },
)

// NOTE: Tv screen
export const tvDetails = createAsyncThunk(
  "tmdb/tv/details",
  async (tvId: number, { dispatch }) => {
    const response = await TMDB_API.get(
      `/tv/${tvId}?language=${LANG}&append_to_response=credits,recommendations,videos`,
    )
    const {
      name,
      tagline,
      overview,
      poster_path,
      status,
      in_production,
      first_air_date,
      last_air_date,
      vote_average,
      number_of_seasons,
      number_of_episodes,
      seasons,
      credits,
      recommendations,
      videos,
    } = response.data

    const filteredSeasons = await Promise.all(
      seasons
        .filter(({ poster_path }: TMDBTvSeason) => poster_path)
        .filter(({ season_number }: TMDBTvSeason) => season_number > 0)
        .map(async ({ id, name, poster_path, season_number }: TMDBTvSeason) => {
          const result = await dispatch(
            tvEpisodes({ tvId, number: season_number }),
          )
          const { payload } = result

          return {
            id,
            tmdbId: id,
            tmdbShowId: tvId,
            title: name,
            number: season_number,
            posterPath: poster_path,
            // @ts-ignore
            items: payload?.items || [],
          }
        }),
    )

    const filteredCast = credits.cast
      .filter(({ profile_path }: TMDBPersonCast) => profile_path)
      .map(({ id, profile_path, name, character }: TMDBPersonCast) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: character,
        }
      })

    const filteredDirector = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) => [TMDB_JOB_DIRECTOR].includes(job))
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredCrew = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) =>
        [
          TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY,
          TMDB_JOB_SCREENPLAY,
          TMDB_JOB_WRITER,
        ].includes(job),
      )
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredRecommendations = recommendations.results
      .filter(({ poster_path }: TMDBRecommendation) => poster_path)
      .map(({ id, title, poster_path }: TMDBRecommendation) => {
        return {
          id,
          tmdbId: id,
          title,
          posterPath: poster_path,
        }
      })

    const filteredVideos = videos.results
      .filter(({ official }: TMDBVideo) => official)
      .filter(({ site }: TMDBVideo) => site === TMDB_YOUTUBE_TYPE)
      .filter(({ type }: TMDBVideo) => type === TMDB_TRAILER_TYPE)
      .map(({ id, name, key, published_at }: TMDBVideo) => {
        return {
          id,
          tmdbId: id,
          name,
          key,
          publishedAt: published_at,
        }
      })

    return {
      id: tvId,
      tmdbId: tvId,
      title: name,
      tagline,
      overview,
      posterPath: poster_path,
      status,
      inProduction: in_production,
      releaseDate: first_air_date,
      endDate: last_air_date,
      rating: vote_average,
      seasonsCount: number_of_seasons,
      episodesCount: number_of_episodes,
      items: filteredSeasons,
      credits: uniqById([
        ...filteredDirector,
        ...filteredCast,
        ...filteredCrew,
      ]),
      recommendations: filteredRecommendations,
      videos: filteredVideos,
    }
  },
)

// NOTE: Tv screen, episodes list
export const tvEpisodes = createAsyncThunk(
  "tmdb/tv/episodes",
  async ({ tvId, number }: { tvId: number; number: number }) => {
    const response = await TMDB_API.get(
      `/tv/${tvId}/season/${number}?include_adult=false&language=${LANG}`,
    )

    const { id, episodes } = response.data
    const tmdb_season_id = id

    const filteredEpisodes = episodes
      .filter(({ air_date }: TMDBTvEpisode) => air_date)
      .map(({ id, name, air_date, runtime, vote_average }: TMDBTvEpisode) => {
        return {
          id,
          tmdbId: id,
          tmdbSeasonId: tmdb_season_id,
          tmdbShowId: tvId,
          title: name,
          airDate: air_date,
          runtime,
          rating: vote_average,
        }
      })

    return {
      id,
      items: filteredEpisodes,
    }
  },
)

export const episodeDetails = createAsyncThunk(
  "tmdb/episode/details",
  async ({
    id,
    tvId,
    seasonNumber,
    episodeNumber,
  }: {
    id: number
    tvId: number
    seasonNumber: number
    episodeNumber: number
  }) => {
    const tvShowResponse = await TMDB_API.get(`/tv/${tvId}?language=${LANG}`)
    const tmdbShowId = tvShowResponse.data.id

    const tvSeasonResponse = await TMDB_API.get(
      `/tv/${tvId}/season/${seasonNumber}?language=${LANG}`,
    )
    const tmdbSeasonId = tvSeasonResponse.data.id

    const response = await TMDB_API.get(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?include_adult=false&language=${LANG}&append_to_response=credits,videos`,
    )
    const {
      name,
      still_path,
      overview,
      runtime,
      vote_average,
      air_date,
      credits,
      guest_stars,
      videos,
    } = response.data

    const filteredCast = credits.cast
      .filter(({ profile_path }: TMDBPersonCast) => profile_path)
      .map(({ id, profile_path, name, character }: TMDBPersonCast) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: character,
        }
      })

    const filteredGuestStars = guest_stars
      .filter(({ profile_path }: TMDBPersonCast) => profile_path)
      .map(({ id, profile_path, name, character }: TMDBPersonCast) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: character,
        }
      })

    const filteredDirector = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) => [TMDB_JOB_DIRECTOR].includes(job))
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredCrew = credits.crew
      .filter(({ profile_path }: TMDBPersonCrew) => profile_path)
      .filter(({ job }: TMDBPersonCrew) =>
        [
          TMDB_JOB_DIRECTOR_OF_PHOTOGRAPHY,
          TMDB_JOB_SCREENPLAY,
          TMDB_JOB_WRITER,
        ].includes(job),
      )
      .map(({ id, profile_path, name, job }: TMDBPersonCrew) => {
        return {
          id,
          tmdbId: id,
          profilePath: profile_path,
          name,
          description: job,
        }
      })

    const filteredVideos = videos.results
      .filter(({ official }: TMDBVideo) => official)
      .filter(({ site }: TMDBVideo) => site === TMDB_YOUTUBE_TYPE)
      .filter(({ type }: TMDBVideo) => type === TMDB_TRAILER_TYPE)
      .map(({ id, name, key, published_at }: TMDBVideo) => {
        return {
          id,
          tmdbId: id,
          name,
          key,
          publishedAt: published_at,
        }
      })

    return {
      id,
      tmdbId: id,
      tmdbShowId,
      tmdbSeasonId,
      title: name,
      posterPath: still_path,
      overview,
      runtime,
      rating: vote_average,
      airDate: air_date,
      credits: uniqById([
        ...filteredDirector,
        ...filteredCast,
        ...filteredGuestStars,
        ...filteredCrew,
      ]),
      videos: filteredVideos,
    }
  },
)

// NOTE: Person screen
export const personDetails = createAsyncThunk(
  "tmdb/person/details",
  async (personId: number) => {
    const response = await TMDB_API.get(
      `/person/${personId}?language=${LANG}&append_to_response=credits,tv_credits`,
    )

    const {
      name,
      birthday,
      profile_path,
      gender,
      imdb_id,
      credits,
      tv_credits,
    } = response.data

    const filterdMovieCastAndCredits = [
      ...filterMovieCredits(credits.cast),
      ...filterMovieCredits(
        credits.crew.filter(({ job }: TMDBPersonCrew) =>
          [TMDB_JOB_DIRECTOR].includes(job),
        ),
      ),
    ]

    const filteredTvCastAndCredits = [
      ...filterTvCredits(tv_credits.cast),
      ...filterTvCredits(
        tv_credits.crew.filter(({ job }: TMDBPersonCrew) =>
          [TMDB_JOB_DIRECTOR].includes(job),
        ),
      ),
    ]

    return {
      id: personId,
      tmdbId: personId,
      imdbId: imdb_id,
      name,
      birthday,
      profilePath: profile_path,
      gender,
      movieCredits: filterdMovieCastAndCredits,
      tvCredits: uniqById(filteredTvCastAndCredits),
    }
  },
)

// NOTE: Search screen
export const trendingMovie = createAsyncThunk(
  "tmdb/trending/movie",
  async () => {
    const response = await TMDB_API.get(
      `/trending/movie/week?include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ poster_path }: TMDBMovieResult) => poster_path)
      .map(({ id, title, poster_path }: TMDBMovieResult) => {
        return {
          id,
          tmdbId: id,
          title,
          posterPath: poster_path,
        }
      })
  },
)

export const trendingTv = createAsyncThunk("tmdb/trending/tv", async () => {
  const response = await TMDB_API.get(
    `/trending/tv/week?include_adult=false&language=${LANG}`,
  )
  const { results } = response.data

  return results
    .filter(({ poster_path }: TMDBTvResult) => poster_path)
    .map(({ id, name, poster_path }: TMDBTvResult) => {
      return {
        id,
        tmdbId: id,
        title: name,
        posterPath: poster_path,
      }
    })
})

export const trendingPeople = createAsyncThunk(
  "tmdb/trending/people",
  async () => {
    const response = await TMDB_API.get(
      `/trending/person/week?include_adult=false&language=${LANG}`,
    )
    const results = response.data.results

    return results
      .filter(({ profile_path }: TMDBPersonResult) => profile_path)
      .map(({ id, name, profile_path }: TMDBPersonResult) => {
        return {
          id,
          tmdbId: id,
          name,
          profilePath: profile_path,
        }
      })
  },
)

export const movieSearch = createAsyncThunk(
  "tmdb/movie/search",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/movie?query=${query}&include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ poster_path }: TMDBMovieResult) => poster_path)
      .map(({ id, title, poster_path }: TMDBMovieResult) => {
        return {
          id,
          tmdbId: id,
          title,
          posterPath: poster_path,
        }
      })
  },
)

export const tvSearch = createAsyncThunk(
  "tmdb/tv/search",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/tv?query=${query}&include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ poster_path }: TMDBTvResult) => poster_path)
      .map(({ id, name, poster_path }: TMDBTvResult) => {
        return {
          id,
          tmdbId: id,
          title: name,
          posterPath: poster_path,
        }
      })
  },
)

export const personSearch = createAsyncThunk(
  "tmdb/person/search",
  async (query: string) => {
    const response = await TMDB_API.get(
      `/search/person?query=${query}&include_adult=false&language=${LANG}`,
    )
    const { results } = response.data

    return results
      .filter(({ profile_path }: TMDBPersonResult) => profile_path)
      .map(({ id, name, profile_path }: TMDBPersonResult) => {
        return {
          id,
          tmdbId: id,
          name,
          profilePath: profile_path,
        }
      })
  },
)

export const resetResults = createAsyncThunk("tmdb/results/reset", async () => {
  return []
})
