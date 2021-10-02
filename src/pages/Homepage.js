import React from "react"
import Navbar from "../components/Navbar"
import TaskList from "../components/TasksList"
import SortMenu from "../components/SortMenu"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <SortMenu />
      <TaskList />
    </>
  )
}

export default HomePage
