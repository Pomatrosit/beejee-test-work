import * as types from "./types"
import { showAlert } from "../alert/actions"
import { axiosWrapper } from "../../utils/axiosWrapper"

export const setAuth = (bool) => ({
  type: types.SET_AUTH,
  payload: bool,
})

export const login = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosWrapper(
        "POST",
        `${process.env.REACT_APP_API_URL}/login?developer=Vasiliy`,
        user
      )
      if (data.status === "error") {
        dispatch(showAlert("Неверный логин или пароль!", 6000))
      } else if (data.status === "ok") {
        dispatch(setAuth(true))
        localStorage.setItem("token", data.message.token)
      }
    } catch (e) {
      console.error(e)
      dispatch(showAlert("Ошибка загрузки!", null))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setAuth(false))
    localStorage.removeItem("token")
  }
}
