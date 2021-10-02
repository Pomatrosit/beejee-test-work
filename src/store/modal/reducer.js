import * as types from "./types"

const initialState = {
  isOpen: false,
  component: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL: {
      return { ...state, isOpen: true, component: action.payload }
    }

    case types.CLOSE_MODAL: {
      return { ...state, isOpen: false, component: null }
    }

    default: {
      return state
    }
  }
}

export default reducer
