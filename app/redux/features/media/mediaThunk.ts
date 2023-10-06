import { createAsyncThunk, AnyAction } from "@reduxjs/toolkit"
import { ThunkDispatch } from "redux-thunk"

import { API } from "redux/api"
import { ImdbResultType } from "types"

export const fetchMedia = createAsyncThunk(
  "media/fetch",
  async (id: string) => {
    const response = await API.get(`/title/${id}`)
    return response.data
  },
)

export const cacheableFetchMedia = (id: string) => {
  return function (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) {
    return new Promise<{ result: ImdbResultType }>((resolve, reject) => {
      return dispatch(fetchMedia(id))
        .then(
          ({ payload }) => {
            resolve({ result: payload })
          },
          () => {
            reject({ result: "error" })
          },
        )
        .catch((error) => {
          reject({ result: error })
        })
    })
  }
}
