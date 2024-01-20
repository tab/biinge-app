import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { ThunkDispatch } from "redux-thunk"
import logger from "redux-logger"
import * as Sentry from "@sentry/react-native"

import { features } from "redux/features"

const rootReducer = combineReducers({
  features,
})

const sentry = Sentry.createReduxEnhancer({})

export const Store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(sentry),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, never, UnknownAction>
