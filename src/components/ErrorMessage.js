import React from "react"
import { Box, Grid, Typography } from "@material-ui/core"

const ErrorMessage = () => {
  return (
    <Grid container justifyContent='center'>
      <Grid item>
        <Box mt={5}>
          <Typography align='center' variant='h6'>
            Ошибка загрузки
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ErrorMessage
