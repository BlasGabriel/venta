import { Box, Paper,  TableContainer } from '@mui/material'
import React from 'react'

const BoxTable = ({children}) => {
  return (
    <Box
    // display="flex"
    justifyContent="center"
    marginTop={5}
    marginBottom={12}
    // overflowX="auto"
    maxWidth= '100%'
  >
          {/* <Box style={{ overflowX: 'auto', maxWidth: '100%' }}> */}

    <Paper
      style={{
        display: "flex",
      }}
    >
      <TableContainer align="center" display="flex">
       
        {children}
      
      </TableContainer>
    </Paper>
  </Box>
  )
}

export default BoxTable