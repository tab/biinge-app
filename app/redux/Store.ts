import { configureStore, AnyAction } from "@reduxjs/toolkit"
import type { PreloadedState } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import thunk, { ThunkDispatch } from "redux-thunk"
import logger from "redux-logger"

import { features } from "redux/features"

const rootReducer = combineReducers({
  features,
})

const middlewares = [thunk, logger]

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState,
  })
}

export const Store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppThunkDispatch = ThunkDispatch<RootState, never, AnyAction>
