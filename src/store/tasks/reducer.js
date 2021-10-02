import * as types from "./types"

const initialState = {
  tasks: [],
  loading: false,
  error: false,
  sortField: 1,
  sortDirection: 1,
  page: 1,
  totalCount: 0,
  addTaskBtnDisabled: false,
  editTaskBtnDisabled: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        totalCount: action.payload.totalCount,
      }
    }

    case types.CHANGE_PAGE: {
      return { ...state, page: action.payload }
    }

    case types.SET_SORT_FIELD: {
      return { ...state, sortField: action.payload }
    }

    case types.SET_SORT_DIRECTION: {
      return { ...state, sortDirection: action.payload }
    }

    case types.SET_LOADING: {
      return { ...state, loading: action.payload }
    }

    case types.SET_ERROR: {
      return { ...state, error: action.payload }
    }

    case types.SET_ADD_TASK_BTN_DISABLED: {
      return { ...state, addTaskBtnDisabled: action.payload }
    }

    case types.SET_EDIT_TASK_BTN_DISABLED: {
      return { ...state, editTaskBtnDisabled: action.payload }
    }

    default: {
      return state
    }
  }
}

export default reducer
