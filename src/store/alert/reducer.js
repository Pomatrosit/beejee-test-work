import * as types from "./types"

const initialState = {
  isOpen: false,
  text: "",
  autoHideDuration: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return {
        ...state,
        isOpen: true,
        text: action.payload.text,
        autoHideDuration: action.payload.autoHideDuration,
      }
    }

    case types.HIDE_ALERT: {
      return { ...state, isOpen: false }
    }

    default: {
      return state
    }
  }
}

export default reducer
