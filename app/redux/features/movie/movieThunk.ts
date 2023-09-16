import { createAsyncThunk } from "@reduxjs/toolkit"

import { API } from "redux/api"

export const fetchMovie = createAsyncThunk(
  "movie/fetch",
  async (id: string) => {
    const response = await API.get(`/title/${id}`)
    return response.data
  },
)
