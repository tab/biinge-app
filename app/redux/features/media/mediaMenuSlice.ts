import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "redux/Store"

const mediaMenuAdapter = createEntityAdapter()
export const initialState = mediaMenuAdapter.getInitialState({
  visible: false,
})

export const mediaMenuSlice = createSlice({
  name: "mediaMenu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.visible = true
    },
    closeMenu: (state) => {
      state.visible = false
    },
  },
})

export const selectMenuVisibility = (state: RootState) =>
  state.features.mediaMenu.visible

export const { openMenu, closeMenu } = mediaMenuSlice.actions
export default mediaMenuSlice.reducer
