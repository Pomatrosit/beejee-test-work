import React, { useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../store/auth/actions"
import {
  Grid,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Box,
} from "@material-ui/core"
import { useDispatch } from "react-redux"
import validator from "validator"
import { sanitizeString } from "../utils/sanitizeString"
import { showAlert } from "../store/alert/actions"

const Auth = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const dispatch = useDispatch()

  const onLogin = () => {
    const validateErrors = []
    if (validator.isEmpty(form.username))
      validateErrors.push("Заполните поле 'Логин!' ")
    if (validator.isEmpty(form.password))
      validateErrors.push("Заполните поле 'Пароль'! ")
    if (validateErrors.length) {
      const errors = validateErrors.join(" ")
      dispatch(showAlert(errors, 6000))
    } else {
      dispatch(
        login({
          username: sanitizeString(form.username),
          password: sanitizeString(form.password),
        })
      )
    }
  }

  return (
    <Container maxWidth='md'>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ height: "100vh" }}
      >
        <Grid xs={3} item>
          <Paper elevation={3} style={{ padding: 30 }}>
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              direction='column'
            >
              <Typography variant='h6' component='div' gutterBottom>
                Авторизация
              </Typography>
              <Box mt={3}>
                <TextField
                  id='username'
                  label='Логин'
                  variant='outlined'
                  name='username'
                  value={form.username}
                  onChange={onChange}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  id='pass'
                  label='Пароль'
                  variant='outlined'
                  type='password'
                  name='password'
                  value={form.password}
                  onChange={onChange}
                />
              </Box>
              <Box mt={3}>
                <Button onClick={onLogin} disabled={false} variant='contained'>
                  Войти
                </Button>
              </Box>
            </Grid>
          </Paper>
          <Box mt={2}>
            <Typography component='div' gutterBottom>
              <Link to='/'>К списку задач</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Auth
