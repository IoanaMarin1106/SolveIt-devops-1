import React from 'react';
import { Avatar, Grid, Button, Container, FormControl, IconButton, MenuItem, Paper, Select, Switch, Tabs, Tab, Toolbar, Typography, CircularProgress, TextField } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { addCommentToResult, fetchCommentsForUserResult } from '../../../actions/problems';
import { useDispatch, useSelector } from 'react-redux';


const CommentsSection = ({ userId }) => {
    const dispatch = useDispatch();
    const {problem, comments } = useSelector((state) => state.problems)

    const user = JSON.parse(localStorage.getItem('profile'));
    const [commentValue, setCommentValue] = React.useState("")

    const handleCommentButton = (e) => {
        e.preventDefault();

        dispatch(addCommentToResult(problem._id, userId, { userId: user?.result?._id, comment: commentValue, createdAt: new Date() }));
        setCommentValue("")
    }

    React.useEffect(() => {
        dispatch(fetchCommentsForUserResult(problem._id, userId));
    }, [dispatch, problem._id, userId]);
    
      if (comments === null) {
            dispatch(fetchCommentsForUserResult(problem._id, userId));
            return;
      }

    return (
        <Paper
        style={{ padding: 10, marginBottom: 50 }}
        elevation={4}
        >
            <Typography gutterBottom marginTop={1} marginLeft={1} variant="h5" component="h2" fontWeight="bold">
                Comments
            </Typography>
            {comments.length === 0 ?
            <Paper style={{ padding: "20px 20px", marginTop: 1 }}>
                <Typography>No comments</Typography>
            </Paper>
            :
            comments.map((comment) => (
                <Paper style={{ padding: "20px 20px", marginTop: 1 }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt={comment.name} src={comment.avatar} />
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <Typography variant="h6" style={{ margin: 0, textAlign: "left" }}>{comment.name}</Typography>
                            <Typography gutterBottom marginBottom={2} style={{ textAlign: "left" }}>
                                {comment.comment}
                            </Typography>
                            <Typography style={{ textAlign: "left", color: "gray" }}>
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid> 
                </Paper>
            ))
            }
            <Paper style={{ padding: "20px 20px", marginTop: 1 }}>
                <TextField 
                value={commentValue}
                onChange={(event) => {setCommentValue(event.target.value)}}
                fullWidth
                label="Write a comment"
                multiline
                rows={4}
                variant="filled"
                />
                <Button 
                variant="outlined" 
                sx={{ marginTop: 2 }} 
                startIcon={<AddCommentIcon/>}
                onClick={handleCommentButton}
                >
                    Comment
                </Button>
            </Paper>
        </Paper>
    );

}

export default CommentsSection;