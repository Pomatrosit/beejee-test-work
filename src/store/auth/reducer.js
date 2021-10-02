import * as types from "./types"

const initialState = {
  isAuth: !!localStorage.getItem("token"),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTH: {
      return { ...state, isAuth: action.payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
