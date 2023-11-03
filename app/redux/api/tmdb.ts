import axios from "axios"

import { TMDB_URL, TMDB_ACCESS_TOKEN } from "config"

export const TMDB_API = axios.create({
  baseURL: TMDB_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
})

export const LANG = "en-US"
