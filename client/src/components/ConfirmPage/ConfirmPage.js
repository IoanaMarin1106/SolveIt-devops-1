import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Link, Paper, Button, Typography, Grid, Box, TextField, Container, CssBaseline, Avatar } from '@mui/material';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import { verifyUser } from '../../actions/users';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Copyright from '../Copyright/Copyright';

import solveitLogo from "../../images/solveit-logo.png"

const theme = createTheme();

const ConfirmPage = () => {
    const navigate = useNavigate();
    
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyUser(id));
    }, [id, dispatch]);

    return (
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

              <Typography component="h1" variant="h4">
                Thank you for your confirmation!
              </Typography>
              <Typography component="h1" variant="h4">
                Account activated.
              </Typography>
              <Typography component="h1" variant="h4">
                Please login.
              </Typography>
              <Box  sx={{ mt: 1 }}>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => { navigate(`/auth/login`) }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
    );
};

export default ConfirmPage