import { combineReducers } from "redux"

import mediaReducer from "redux/features/media/mediaSlice"

export const features = combineReducers({
  media: mediaReducer,
})
