import React, { useState } from 'react';
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button, Card, CardContent, Typography, CardActionArea, IconButton, CardActions, Tooltip } from '@mui/material';
import Moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import useStyles from './styles';
import { yellow, grey } from '@mui/material/colors';

import { addProblemToFavorites, deleteProblem } from '../../../actions/problems';

const Problem = ({ problem, setCurrentId }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const hasProblemToFavorites = problem.favorites.find((id) => id === user?.result?._id)
    const [favorite, setFavorite] = useState(hasProblemToFavorites)
    const [open, setOpen] = useState(false)
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const handleFavorites = async () => {
        dispatch(addProblemToFavorites(problem._id));

        setFavorite(!favorite);
    }

    const handleDelete = () => {
        setOpen(false);

        dispatch(deleteProblem(problem._id));

        window.location.reload(false);
    }

    const Favorite = () => {
        return favorite
            ? (
                <><StarIcon style={{ color: yellow[700]}}/></>
            ) : (
                <><StarIcon style={{ color: grey[400]}}/></>
            );
    };

    return (
        <Card className={classes.card}>
            <Tooltip
                followCursor
                disableFocusListener
                disableTouchListener
                title={(problem.availableFromEnabled && (new Date(problem.availableFrom) > new Date())) ? `Available from ${new Date(problem.availableFrom).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}` : ""}
            >  
            <CardActionArea onClick={() => {
                if (problem.availableFromEnabled && (new Date(problem.availableFrom) > new Date()) && user?.result?.role === "Student")
                    return;
                navigate(`/problems/${problem._id}`)}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                        {problem.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Max score: {problem.numberOfTests}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Author: {problem.creator}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Created at: {new Date(problem.createdAt).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                    </Typography>
                    {/* {problem.availableFromEnabled &&
                    <Typography variant="body2" color="textSecondary" component="p">
                        Available From: {new Date(problem.availableFrom).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                    </Typography>
                    } */}
                    {problem.dueDateEnabled &&
                    <Typography variant="body2" color="red" component="p">
                        Due date: {new Date(problem.dueDate).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                    </Typography>
                    }
                </CardContent>
            </CardActionArea>
            </Tooltip>
            <CardActions>
                <IconButton onClick={() => handleFavorites()}>
                    <Favorite />
                </IconButton>
                {user?.result?.role === "Teacher" && <IconButton onClick={() => navigate(`/problems/${problem._id}/edit`, { state: { problem: problem } })}>
                    <EditIcon style={{ color: grey[400]}} />
                </IconButton>}
                {user?.result?.role === "Teacher" && <IconButton onClick={() => handleClickOpen()}>
                    <DeleteForeverIcon style={{ color: grey[400]}}/>
                </IconButton>}
            </CardActions>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${problem.title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you choose to delete the problem, this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </Card>
    );
};

export default Problem;