import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { useDispatch, useSelector } from "react-redux"
import { hideAlert } from "../store/alert/actions"

const Alert = () => {
  const { isOpen, text, autoHideDuration } = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isOpen}
      message={text}
      autoHideDuration={autoHideDuration}
      onClose={() => dispatch(hideAlert())}
      action={
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={() => dispatch(hideAlert())}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    />
  )
}

export default Alert
