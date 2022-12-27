import { Avatar, CssBaseline, Grid, Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

import { useNavigate } from 'react-router';

import Navbar from '../Navbar/Navbar'
import Copyright from '../Copyright/Copyright';
import solveitLogo from '../../images/solveit-logo.png'

const Home = () => {
    const isUser = localStorage.getItem('profile') !== null
    const navigate = useNavigate()
    return (
        <>
        <Navbar />
        <Container component="main" maxWidth="lg">
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
                <Typography variant="h1">SolveIt</Typography>
                </Grid>
              </Grid>
            </Box>

              
              {
                isUser ? 
                <>
                <Typography component="h1" variant="h2">
                    Welcome (back), {JSON.parse(localStorage.getItem('profile'))?.result?.firstName}!
                </Typography>
                <Typography m={1} component="h1" variant="h4">
                    Are you ready for new challenges in problem solving?
                </Typography>
                <Typography m={1} component="h1" variant="h4">
                    Go hit the problems button...
                </Typography>
                <Typography m={1} component="h1" variant="h3">
                    And let's Solve It!
                </Typography>
                </>
                :
                <>
                <Typography component="h1" variant="h2">
                    Welcome!
                </Typography>
                <Typography m={1} component="h1" variant="h4">
                    Do you want to join our problem solving platform as a student or teacher?
                </Typography>
                <Typography m={1} component="h1" variant="h4">
                    Go hit the login button...
                </Typography>
                <Typography m={1} component="h1" variant="h3">
                    And let's Solve It!
                </Typography>
                </>
              }
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </>
    )
}

export default Home;