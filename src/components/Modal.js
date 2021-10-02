import React from "react"
import Modal from "@mui/material/Modal"
import { Box } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/modal/actions"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
}

const ModalWindow = () => {
  const { isOpen, component } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(actions.closeModal())}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{component}</Box>
    </Modal>
  )
}

export default ModalWindow
