import * as types from "./types"

export const openModal = (Component) => ({
  type: types.OPEN_MODAL,
  payload: Component,
})

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
})
