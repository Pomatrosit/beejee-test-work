import React from "react"
import {
  Container,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/tasks/actions"

const SortMenu = () => {
  const { sortField, sortDirection } = useSelector((state) => state.tasks)

  const dispatch = useDispatch()

  return (
    <Container maxWidth='md'>
      <Box mt={5}>
        <Grid container justifyContent='center' alignItems='center' spacing={5}>
          <Grid xs={3} item>
            <FormControl fullWidth>
              <InputLabel id='sort-field'>Сортировать по</InputLabel>
              <Select
                labelId='sort-field'
                id='sort-field'
                value={sortField}
                label='Сортировать по'
                onChange={(e) => dispatch(actions.setSortField(e.target.value))}
              >
                <MenuItem value={1}>Имени пользователя</MenuItem>
                <MenuItem value={2}>Email</MenuItem>
                <MenuItem value={3}>Статусу</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} item>
            <FormControl fullWidth>
              <InputLabel id='sort-direction'>Направление</InputLabel>
              <Select
                labelId='sort-direction'
                id='sort-direction'
                value={sortDirection}
                label='Направление'
                onChange={(e) =>
                  dispatch(actions.setSortDirection(e.target.value))
                }
              >
                <MenuItem value={1}>По возрастанию</MenuItem>
                <MenuItem value={2}>По убыванию</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SortMenu
