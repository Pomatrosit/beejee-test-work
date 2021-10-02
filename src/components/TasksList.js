import React from "react"
import Task from "./Task"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"
import AddTaskForm from "./AddTaskForm"
import { Container, Box, Grid, Typography, Button } from "@material-ui/core"
import Pagination from "@mui/material/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { changePage } from "../store/tasks/actions"
import { openModal } from "../store/modal/actions"

const TaskList = () => {
  const head = [
    { id: 1, title: "Имя пользователя" },
    { id: 2, title: "Email" },
    { id: 3, title: "Текст задачи" },
    { id: 4, title: "Статус" },
  ]

  const dispatch = useDispatch()

  const { tasks, page, totalCount, loading, error } = useSelector(
    (state) => state.tasks
  )
  const TASKS_PER_PAGE = 3
  const pageCount = Math.ceil(+totalCount / TASKS_PER_PAGE)

  if (loading) return <Loader />

  if (error) return <ErrorMessage />

  const onAddTask = () => {
    dispatch(openModal(<AddTaskForm />))
  }

  return (
    <Box mt={5}>
      <Container maxWidth='lg'>
        <Box>
          <Grid container alignItems='flex-start' spacing={2}>
            {head.map((el) => (
              <Grid key={el.id} item xs={3}>
                <Typography variant='h6' component='div' gutterBottom>
                  {el.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </Box>

        <Box mt={5}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Button variant='contained' onClick={onAddTask}>
                Добавить задачу
              </Button>
            </Grid>
            <Grid item>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => dispatch(changePage(value))}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default TaskList
