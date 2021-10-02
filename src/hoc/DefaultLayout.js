import React from "react"
import ModalWindow from "../components/Modal"
import Alert from "../components/Alert"

const DefaultLayout = ({ children }) => {
  return (
    <>
      {children}
      <Alert />
      <ModalWindow />
    </>
  )
}

export default DefaultLayout
