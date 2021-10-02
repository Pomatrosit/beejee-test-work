import React from "react"
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  Container,
  Typography,
  Box,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/auth/actions"
import { showAlert } from "../store/alert/actions"

const Navbar = () => {
  const history = useHistory()
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(showAlert("Вы вышли из аккаунта!", 6000))
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
          >
            <Grid item>Tasks App</Grid>

            {isAuth ? (
              <Grid item>
                <Grid container alignItems='center'>
                  <Box mr={3} mt={1}>
                    <Typography component='div' gutterBottom>
                      Администратор
                    </Typography>
                  </Box>
                  <Button onClick={onLogout} variant='contained'>
                    Выйти
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  onClick={() => history.push("/auth")}
                  variant='contained'
                >
                  Войти
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
