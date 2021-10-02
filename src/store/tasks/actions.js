import * as types from "./types"
import { axiosWrapper } from "../../utils/axiosWrapper"
import { showAlert } from "../alert/actions"
import { closeModal } from "../modal/actions"
import { logout } from "../auth/actions"

export const setTasks = (tasks, totalCount) => ({
  type: types.SET_TASKS,
  payload: {
    tasks,
    totalCount,
  },
})

export const changePage = (page) => ({
  type: types.CHANGE_PAGE,
  payload: page,
})

export const setSortField = (id) => ({
  type: types.SET_SORT_FIELD,
  payload: id,
})

export const setSortDirection = (id) => ({
  type: types.SET_SORT_DIRECTION,
  payload: id,
})

export const setLoading = (bool) => ({
  type: types.SET_LOADING,
  payload: bool,
})

export const setError = (bool) => ({
  type: types.SET_ERROR,
  payload: bool,
})

export const setAddTaskBtnDisabled = (bool) => ({
  type: types.SET_ADD_TASK_BTN_DISABLED,
  payload: bool,
})

export const setEditTaskBtnDisabled = (bool) => ({
  type: types.SET_EDIT_TASK_BTN_DISABLED,
  payload: bool,
})

export const loadTasks = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(setError(false))
    const { page, sortField, sortDirection } = getState().tasks

    try {
      const { data } = await axiosWrapper(
        "GET",
        `${
          process.env.REACT_APP_API_URL
        }/?developer=Vasiliy&sort_field=${getSortFieldCaption(
          sortField
        )}&sort_direction=${getSortDirectionCaption(
          sortDirection
        )}&page=${page}`
      )
      const tasks = data.message.tasks
      const totalCount = data.message.total_task_count
      dispatch(setTasks(tasks, totalCount))
    } catch (e) {
      console.error(e)
      dispatch(setError(true))
      dispatch(showAlert("Ошибка загрузки!", null))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch(setAddTaskBtnDisabled(true))

    try {
      const { data } = await axiosWrapper(
        "POST",
        `${process.env.REACT_APP_API_URL}/create?developer=Vasiliy`,
        task
      )

      if (data.status === "ok") {
        dispatch(showAlert("Задача успешно добавлена!", 6000))
        dispatch(closeModal())
        dispatch(loadTasks())
      } else if (data.status === "error") {
        const errors = []
        Object.keys(data.message).forEach((key) => {
          errors.push(`Поле ${key} является обязательным для заполнения! `)
        })
        dispatch(showAlert(errors.join(" "), 6000))
      }
    } catch (e) {
      console.error(e)
      dispatch(showAlert("Ошибка загрузки!", null))
    } finally {
      dispatch(setAddTaskBtnDisabled(false))
    }
  }
}

export const editTask = (task) => {
  return async (dispatch) => {
    dispatch(setEditTaskBtnDisabled(true))
    try {
      const { data } = await axiosWrapper(
        "POST",
        `${process.env.REACT_APP_API_URL}/edit/${task.id}?developer=Vasiliy`,
        {
          text: task.text,
          status: task.status,
          token: localStorage.getItem("token"),
        }
      )
      if (data.status === "ok") {
        dispatch(showAlert("Задача успешно изменена!", 6000))
        dispatch(closeModal())
        dispatch(loadTasks())
      } else if (data.status === "error") {
        dispatch(showAlert("Невалидный токен, авторизуйтесь заново !", 6000))
        dispatch(closeModal())
        dispatch(logout())
      }
    } catch (e) {
      console.error(e)
      dispatch(showAlert("Ошибка загрузки!", null))
    } finally {
      dispatch(setEditTaskBtnDisabled(false))
    }
  }
}

function getSortFieldCaption(sortField) {
  let sortFieldId
  switch (sortField) {
    case 1:
      sortFieldId = "username"
      break
    case 2:
      sortFieldId = "email"
      break
    case 3:
      sortFieldId = "status"
      break
    default:
      sortFieldId = "username"
      break
  }
  return sortFieldId
}

function getSortDirectionCaption(sortDirection) {
  let sortDirectionId
  switch (sortDirection) {
    case 1:
      sortDirectionId = "asc"
      break
    case 2:
      sortDirectionId = "desc"
      break
    default:
      sortDirectionId = "asc"
      break
  }
  return sortDirectionId
}
