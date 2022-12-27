import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup } from "../../actions/auth";
import solveitLogo from "../../images/solveit-logo.png";
import Copyright from '../Copyright/Copyright';
import { FormControlLabel, RadioGroup, Radio, FormControl } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const theme = createTheme();

const SignUp = () => {
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [facultyError, setFacultyError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState();
    const [passwordError, setPasswordError] = useState(false);
    const [radioValue, setRadioValue] = useState("student")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setEmailErrorMessage();
        setPasswordError(false);
        setFacultyError(false);

        const data = new FormData(event.currentTarget);
        let error = false;
        const firstName = data.get('firstName');
        if (firstName === "") {
          setFirstNameError(true);
          error = true;
        }

        const lastName = data.get('lastName');
        if (lastName === "") {
          setLastNameError(true);
          error = true;
        }

        const email = data.get('email');
        if (email === "") {
          setEmailError(true);
          error = true;
        }

        const faculty = data.get('faculty');
        if (faculty === "") {
          setFacultyError(true);
          error = true;
        }

        if (error) return;

        const signData = { email: data.get('email'),
                           firstName: data.get('firstName'),
                           lastName: data.get('lastName'),
                           password: data.get('password'),
                           confirmPassword: data.get('confirmPassword'),
                           faculty: data.get('faculty'),
                           role: radioValue.charAt(0).toUpperCase() + radioValue.slice(1)};

        dispatch(signup(signData, navigate)).then(data => {
          if (data === "Passwords don't match.")
            setPasswordError(true)
          
          if (data === "User already exists.") {
            setEmailError(true)
            setEmailErrorMessage("User already exists")
          }

          if (data === "Email doesn't exist.") {
            setEmailError(true)
            setEmailErrorMessage("Email doesn't exist")
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
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={firstNameError}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={lastNameError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioGroup
                      row 
                      value={radioValue}
                      onChange={(e) => {
                        setRadioValue(e.target.value)
                      }}
                    >
                      <FormControlLabel value="student" control={<Radio />} label="Student" />
                      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="faculty"
                      label="Faculty"
                      name="faculty"
                      autoComplete="faculty"
                      error={facultyError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={emailError}
                      helperText={emailError ? emailErrorMessage : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={passwordError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      error={passwordError}
                      helperText={passwordError ? "Password doesn't match" : ""}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/auth/login" variant="body2">
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        </>
      );
}

export default SignUp;