import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSeletor } from "react-router-dom";
import solveitLogo from "../../images/solveit-logo.png"
import Copyright from '../Copyright/Copyright';
import Navbar from "../Navbar/Navbar";

const theme = createTheme();

const LogIn = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const { authData } = useSelector((state) => state.auth)
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        setEmailError(false);
        setEmailErrorMessage("");
        setPasswordError(false);
        
        const data = new FormData(event.currentTarget);
        const signData = {
          email: data.get('email'),
          password: data.get('password'),
          rememberMe,
        };

        dispatch(login(signData, navigate)).then(data => {
          if (data === "User doesn't exist.") {
            setEmailError(true);
            setEmailErrorMessage(data);
          }

          if (data === "Invalid credentials.") {
            setEmailError(true);
            setPasswordError(true);
          }

          if (data === "Pending Account.") {
            setEmailError(true);
            setEmailErrorMessage("Pending Account. Please verify your email and activate your account.")
          }
        });
      };
    
      return (
        <>
        <Navbar/>
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
                Log In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError ? emailErrorMessage : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError}
                  helperText={passwordError ? "Invalid credentials." : ""}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" onChange={() => setRememberMe(!rememberMe)} color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/auth/forgotPassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/auth/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
        </>
      );
}

export default LogIn;