import React from 'react'

import { Typography, Link} from '@mui/material'


const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3000/">
            SolveIt
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );      
}

export default Copyright;