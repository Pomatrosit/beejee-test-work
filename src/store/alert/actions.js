import * as types from "./types"

export const showAlert = (text, autoHideDuration) => ({
  type: types.SHOW_ALERT,
  payload: {
    text,
    autoHideDuration,
  },
})

export const hideAlert = () => ({
  type: types.HIDE_ALERT,
})
