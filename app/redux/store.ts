import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { ThunkDispatch } from "redux-thunk"
import logger from "redux-logger"

import { features } from "redux/features"

const rootReducer = combineReducers({
  features,
})

export const Store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, never, UnknownAction>
