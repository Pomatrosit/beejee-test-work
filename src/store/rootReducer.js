import { combineReducers } from "redux"
import tasks from "./tasks/reducer"
import modal from "./modal/reducer"
import alert from "./alert/reducer"
import auth from "./auth/reducer"

export const rootReducer = combineReducers({
  tasks,
  modal,
  alert,
  auth,
})
