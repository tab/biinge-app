import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

import { features } from "redux/features"

const rootReducer = combineReducers({
  features,
})

export const Store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
