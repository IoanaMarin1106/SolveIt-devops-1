import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Link, Paper, Button, Typography, Grid, Box, TextField, Container, CssBaseline, Avatar } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import { approveTeacher, getUserById } from '../../actions/users';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Copyright from '../Copyright/Copyright';

import solveitLogo from "../../images/solveit-logo.png"

const theme = createTheme();

const TeacherApprovalPage = () => {
    const { userProfile } = useSelector((state) => state.user)
    const { id } = useParams();
    const dispatch = useDispatch();
    const [approved, setApproved] = React.useState(false)

    const handleClick = () => {
        setApproved(true);
        dispatch(approveTeacher(id));
    }

    useEffect(() => {
        dispatch(getUserById(id));
    }, [id, dispatch]);

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
              { approved ?
              <>
              <Typography component="h1" variant="h4">
                Thank you for your approval!
              </Typography>
              <Typography component="h1" variant="h4">
                Account activated.
              </Typography>
              <Typography component="h1" variant="h4">
                {userProfile.firstName} {userProfile.lastName} is now a SolveIt Teacher.
              </Typography>
              <Typography component="h1" variant="h4">
                You can leave this page anytime.
              </Typography>
              </>
              :
              <>
              <Typography component="h1" variant="h4">
              {userProfile.firstName} {userProfile.lastName} requests a teacher account.
              </Typography>
              <Typography component="h1" variant="h4">
              Click the button below to approve the request.
              </Typography>
              <Box  sx={{ mt: 1 }}>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClick}
                >
                  Approve Account
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

export default TeacherApprovalPage