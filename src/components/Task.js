import React from "react"
import { Paper, Box, Grid, Icon, Typography } from "@material-ui/core"
import { green, red, blue } from "@material-ui/core/colors"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../store/modal/actions"
import EditTaskForm from "./EditTaskForm"
import ReactTooltip from "react-tooltip"

const Task = ({ task }) => {
  let icons
  switch (task.status) {
    case 0: {
      icons = (
        <span data-tip data-for='notCompleted'>
          <ReactTooltip id='notCompleted'>
            <span>Задача не завершена</span>
          </ReactTooltip>
          <Icon style={{ color: red[500] }}>clear</Icon>
        </span>
      )
      break
    }
    case 1: {
      icons = (
        <>
          <span data-tip data-for='notCompleted'>
            <ReactTooltip id='notCompleted'>
              <span>Задача не завершена</span>
            </ReactTooltip>
            <Icon style={{ color: red[500] }}>clear</Icon>
          </span>
          <span data-tip data-for='notCompletedEdited'>
            <ReactTooltip id='notCompletedEdited'>
              <span>Задача отредактирована админом</span>
            </ReactTooltip>
            <Icon style={{ color: blue[500] }}>edit</Icon>
          </span>
        </>
      )
      break
    }
    case 10: {
      icons = (
        <span data-tip data-for='сompleted'>
          <ReactTooltip id='сompleted'>
            <span>Задача завершена</span>
          </ReactTooltip>
          <Icon style={{ color: green[500] }}>task_alt</Icon>
        </span>
      )
      break
    }
    case 11: {
      icons = (
        <>
          <span data-tip data-for='сompleted'>
            <ReactTooltip id='сompleted'>
              <span>Задача завершена</span>
            </ReactTooltip>
            <Icon style={{ color: green[500] }}>task_alt</Icon>
          </span>
          <span data-tip data-for='notCompletedEdited'>
            <ReactTooltip id='notCompletedEdited'>
              <span>Задача отредактирована админом</span>
            </ReactTooltip>
            <Icon style={{ color: blue[500] }}>edit</Icon>
          </span>
        </>
      )
      break
    }
    default: {
      icons = null
      break
    }
  }

  const { isAuth } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onEdit = (task) => {
    dispatch(openModal(<EditTaskForm task={task} />))
  }

  return (
    <Box mt={2}>
      <Paper elevation={3} style={{ padding: "5px 10px" }}>
        <Grid container alignItems='flex-start' spacing={3}>
          <Grid item xs={3}>
            {task.username}
          </Grid>
          <Grid item xs={3}>
            {task.email}
          </Grid>
          <Grid item xs={3}>
            {task.text}
          </Grid>
          <Grid item xs={3}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Box>{icons}</Box>
              {isAuth && (
                <Box>
                  <Typography
                    onClick={() => onEdit(task)}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "darkblue",
                    }}
                    component='div'
                    gutterBottom
                  >
                    Редактировать
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Task
