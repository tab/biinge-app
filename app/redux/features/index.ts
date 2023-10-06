import { combineReducers } from "redux"

import mediaReducer from "redux/features/media/mediaSlice"
import mediaMenuReducer from "redux/features/media/mediaMenuSlice"

export const features = combineReducers({
  media: mediaReducer,
  mediaMenu: mediaMenuReducer,
})
