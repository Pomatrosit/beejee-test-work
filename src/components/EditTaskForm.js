import React, { useRef, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import validator from "validator"
import { showAlert } from "../store/alert/actions"
import { editTask } from "../store/tasks/actions"
import { sanitizeString } from "../utils/sanitizeString"

const convertTaskStatus = (status) => {
  if (status === 0 || status === 1) return 0
  return 10
}

const EditTaskForm = ({ task }) => {
  const oldTaskText = useRef(task.text)
  const oldTaskStatus = useRef(task.status)

  const [status, setStatus] = useState(convertTaskStatus(task.status))
  const [text, setText] = useState(task.text)

  const dispatch = useDispatch()
  const { editTaskBtnDisabled } = useSelector((state) => state.tasks)

  const onEditTask = () => {
    let newStatus = status
    if (
      oldTaskStatus.current === 1 ||
      oldTaskStatus.current === 11 ||
      oldTaskText.current.trim() !== text.trim()
    ) {
      if (status === 0) newStatus = 1
      else newStatus = 11
    }

    const editedTask = {
      id: task.id,
      text: sanitizeString(text),
      status: newStatus,
    }

    if (validator.isEmpty(text)) {
      dispatch(showAlert("Поле 'текст' не может быть пустым!", 6000))
    } else {
      dispatch(editTask(editedTask))
    }
  }

  return (
    <Box>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h6' component='div' gutterBottom>
            Редактирование задачи
          </Typography>
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
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <FormControl fullWidth>
              <InputLabel id='sort-field'>Cтатус</InputLabel>
              <Select
                labelId='sort-field'
                id='sort-field'
                value={status}
                label='Статус'
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={0}>Не выполнена</MenuItem>
                <MenuItem value={10}>Выполнена</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Box mt={3}>
          <Button
            disabled={editTaskBtnDisabled}
            onClick={onEditTask}
            variant='contained'
          >
            Сохранить
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default EditTaskForm
