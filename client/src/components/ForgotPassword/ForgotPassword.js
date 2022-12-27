import React, { useState } from "react";
import {Alert, Snackbar} from '@mui/material'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSeletor } from "react-router-dom";
import solveitLogo from "../../images/solveit-logo.png"
import Copyright from '../Copyright/Copyright';
import { sendResetPasswordLink } from "../../actions/users";
import Navbar from "../Navbar/Navbar";

const theme = createTheme();

const ForgotPassword = () => {
    const [emailError, setEmailError] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
      setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        dispatch(sendResetPasswordLink(data.get('email'))).then(data => {
          if (data === "User not found.") {
            setEmailError(true);
          } else {
            setOpen(true);
          }
        })
    };
    

      return (
        <>
        <Navbar />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
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
              <Grid container direction="row" alignItems="center" marginBottom={3}>
                <Grid item marginRight={2}>
                  <Avatar sx={{width:"64px", height:"64px"}} src={solveitLogo}></Avatar>
                </Grid>
                <Grid item>
                <Typography variant="h2">SolveIt</Typography>
                </Grid>
              </Grid>
              </Box>

              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError ? "User doesn't exists." : ""}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send Reset Link
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
              Reset link sent! Please verify your email.
            </Alert>
          </Snackbar>
        </ThemeProvider>
        </>
      );
}

export default ForgotPassword;