import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Box, CssBaseline, Button, Grid, Container, Avatar, Typography} from '@mui/material'
import Copyright from '../Copyright/Copyright';
import solveitLogo from "../../images/solveit-logo.png"

import { useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';

const theme = createTheme()

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
      <>
        <Navbar/>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box>
              <Grid container direction="row" alignItems="center" marginBottom={3}> {/*couldn't center it*/}
                <Grid item marginRight={2}>
                  <Avatar sx={{width:"64px", height:"64px"}} src={solveitLogo}></Avatar>
                </Grid>
                <Grid item>
                <Typography variant="h2">SolveIt</Typography>
                </Grid>
              </Grid>
              </Box>

              <Typography component="h1" variant="h4" sx={{ color: "#d60000" }}>
                You are not authorized to be here!
              </Typography>
              <Typography component="h1" variant="h4" sx={{ color: "#d60000" }}>
                Go home!
              </Typography>
              <Typography component="h1" variant="h4" sx={{ color: "#d60000" }}>
                Please login if you are not.
              </Typography>
              <Box  sx={{ mt: 1 }}>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => { navigate(`/`) }}
                >
                  Home
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
        </>
    );
};

export default UnauthorizedPage;