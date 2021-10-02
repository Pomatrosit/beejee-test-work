import React from "react"
import { Box, CircularProgress, Grid } from "@material-ui/core"

const Loader = () => {
  return (
    <Grid container justifyContent='center'>
      <Grid item>
        <Box mt={10}>
          <CircularProgress />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Loader
