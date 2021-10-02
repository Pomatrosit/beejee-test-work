import React, { useState } from "react"
import { Box, Typography, TextField, Button, Grid } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { addTask } from "../store/tasks/actions"
import validator from "validator"
import { showAlert } from "../store/alert/actions"
import { sanitizeString } from "../utils/sanitizeString"

const AddTaskForm = () => {
  const dispatch = useDispatch()
  const { addTaskBtnDisabled } = useSelector((state) => state.tasks)

  const [form, setForm] = useState({
    username: "",
    email: "",
    text: "",
  })

  const onAddTask = () => {
    const validateErrors = []
    if (validator.isEmpty(form.username))
      validateErrors.push("Введите имя пользователя! ")
    if (!validator.isEmail(form.email))
      validateErrors.push("Введите корректный email! ")
    if (validator.isEmpty(form.text))
      validateErrors.push("Введите текст задачи!")
    if (validateErrors.length) {
      const errors = validateErrors.join(" ")
      dispatch(showAlert(errors, 6000))
    } else {
      dispatch(
        addTask({
          username: sanitizeString(form.username),
          email: sanitizeString(form.email),
          text: sanitizeString(form.text),
        })
      )
    }
  }

  return (
    <Box>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h6' component='div' gutterBottom>
            Добавление задачи
          </Typography>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <TextField
              id='username'
              label='Имя пользователя'
              variant='outlined'
              name='username'
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              name='email'
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <TextField
              id='text'
              label='Текст задачи'
              variant='outlined'
              multiline
              rows={4}
              name='text'
              value={form.text}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </Box>
        </Grid>
        <Box mt={3}>
          <Button
            disabled={addTaskBtnDisabled}
            onClick={onAddTask}
            variant='contained'
          >
            Добавить
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default AddTaskForm
