import React, { useEffect } from "react"
import DefaultLayout from "./hoc/DefaultLayout"
import { useDispatch, useSelector } from "react-redux"
import { loadTasks } from "./store/tasks/actions"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import HomePage from "./pages/Homepage"
import AuthPage from "./pages/AuthPage"

function App() {
  const dispatch = useDispatch()
  const { page, sortField, sortDirection } = useSelector((state) => state.tasks)
  const { isAuth } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadTasks())
  }, [page, sortField, sortDirection, dispatch])

  return (
    <DefaultLayout>
      <BrowserRouter>
        {isAuth ? (
          <Switch>
            <Route path='/' exact component={HomePage}></Route>
            <Redirect to='/'></Redirect>
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={HomePage}></Route>
            <Route path='/auth' exact component={AuthPage}></Route>
            <Redirect to='/'></Redirect>
          </Switch>
        )}
      </BrowserRouter>
    </DefaultLayout>
  )
}
export default App
