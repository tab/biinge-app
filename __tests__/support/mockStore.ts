import { configureMockStore } from "@jedmao/redux-mock-store"
import thunk, { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"

import { RootState } from "redux/store"

const middlewares = [thunk]

export default configureMockStore<
  RootState,
  AnyAction,
  ThunkDispatch<RootState, never, AnyAction>
>(middlewares)
