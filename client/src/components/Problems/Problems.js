import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import useStyles from "./styles";
import Problem from "./Problem/Problem";
import { Container, Box, CircularProgress, Grid } from "@mui/material";

import { getProblems, getFavoriteProblems } from "../../actions/problems";
import Navbar from "../Navbar/Navbar";
import { useTheme } from '@mui/material/styles'

// import {Buffer} from 'buffer';


const Problems = ({isFavorites}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const { problems, favorites } = useSelector((state) => state.problems);
  const classes = useStyles();
  const navigate = useNavigate();

  const theme = useTheme();
  
  useEffect(() => {
    if (user?.result)
      dispatch(getFavoriteProblems(user?.result?._id, navigate))

    dispatch(getProblems(navigate))
  }, [dispatch, navigate]);

  return problems === null ? (
    <>
      <Navbar />
      <CircularProgress />
      <Fab
        className={classes.addButton}
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate("/problems/create");
        }}
      >
        <AddIcon />
      </Fab>
    </>
  ) : (
    <>
      <Navbar />
      <Container maxWidth="xxl">
      <Grid className={classes.mainContainer} container direction="column" alignItems="stretch" spacing={3} maxWidth="xxl">
        {isFavorites ? 
        favorites.map((problem) => (
          <Grid key={problem._id} item xs={12} sm={12} md={12}>
              <Problem problem={problem} />
          </Grid>
      ))
        : 
        problems.map((problem) => (
            <Grid key={problem._id} item xs={12} sm={12} md={12}>
                <Problem problem={problem} />
            </Grid>
        ))}
      </Grid>
      </Container>
      { user?.result?.role === "Teacher" && <Fab
        sx={{ position: 'fixed',
        alignSelf: 'flex-end',
        bottom: theme.spacing(2),
        right: theme.spacing(2), }}
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate("/problems/create");
        }}
      >
        <AddIcon />
      </Fab>}
    </>
  );
};

export default Problems;
