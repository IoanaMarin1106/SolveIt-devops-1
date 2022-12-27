import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Link, Paper, Button, Typography, Grid, Box, TextField, Container, CssBaseline, Avatar, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import { approveTeacher, changePasswordWithoutAuth, getUserById } from '../../actions/users';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Copyright from '../Copyright/Copyright';

import solveitLogo from "../../images/solveit-logo.png"
import { makeStyles } from "@mui/styles";

const theme = createTheme();
const useStyles = makeStyles(theme => ({
    root: {

      "& .MuiFormHelperText-root": {
        color: "green !important"
      },

      '& label.Mui-focused': {
        color: 'green !important',
      },

      '& .MuiInput-underline:after': {
        borderBottomColor: 'green !important',
      },

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'green !important',
        },
        '&:hover fieldset': {
          borderColor: 'green !important',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green !important',
        },
        },
    },
    nothing: {

    }

}));

const ResetPassword = () => {
    const { userProfile } = useSelector((state) => state.user)
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reset, setReset] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    const handleClick = () => {
        const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        const pwdLen = 32;
        const randPassword = Array(pwdLen).fill(pwdChars).map(function(x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');

        dispatch(changePasswordWithoutAuth({ password: randPassword }, id));
        console.log(randPassword)
        setPassword(randPassword)
        setReset(true);
    }

    const handleClickAfterReset = () => {
        navigate(`/auth/login`)
    }

    const handleCopy = (event) => {
        setCopied(true)
        navigator.clipboard.writeText(password);
    }

    useEffect(() => {
        dispatch(getUserById(id));
    }, [id, dispatch]);

    const classes = useStyles();

    if (userProfile == null)
        return;

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
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
              { reset ?
              <>
              <Typography component="h1" variant="h4">
                New password generated.
              </Typography>
              <TextField
                className={copied ? classes.root : classes.nothing}
                margin="normal"
                sx = { copied ? { width: "400px", input: {color: "green"} } : { width: "400px" }}
                name="password"
                label="Password"
                value={password}
                type="text"
                id="password"
                // error={copied}
                helperText={copied ? "Copied to clipboard" : ""}
                InputProps={{endAdornment: <IconButton
                edge = "end"
                sx = {{ color: copied ? "green" : "primary"}}
                onClick={handleCopy}
                >
                    <ContentCopyIcon />
                </IconButton>}}
                />
              <Typography component="h1" variant="h6">
                Don't forget to copy the new password. Use it to login and change it from the profile menu.
              </Typography>
              <Box  sx={{ mt: 1 }}>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClickAfterReset}
                >
                  Log In
                </Button>
              </Box>
              </>
              :
              <>
              <Typography component="h1" variant="h4">
              You requested a password reset.
              </Typography>
              <Typography component="h1" variant="h4">
              Click the button below to get your new password.
              </Typography>
              <Box  sx={{ mt: 1 }}>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Reset Password
                </Button>
              </Box>
              </>
            }
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
    );
};

export default ResetPassword