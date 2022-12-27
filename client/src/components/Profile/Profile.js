import { Avatar, Badge, Box, Card, CardContent, CardHeader, Container, IconButton, Input, Paper, Tooltip, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material"
import React, { useEffect, useRef } from "react";
import moment from 'moment';
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles"
import { useDispatch, useSelector } from "react-redux";

import { getUserById, updateUserProfile, updateUserAvatar } from "../../actions/users";

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { userProfile } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const { id } = useParams();
    const hiddenFileInput = useRef();
    
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getUserById(id));
      }, [id, dispatch]);

    if (localStorage.getItem('profile') === null || !userProfile) return null;

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    const handleAvatarChange = async (e) => {
        const fileUploaded = e.target.files[0];
        const base64 = await convertToBase64(fileUploaded);

        dispatch(updateUserAvatar({ avatar: base64 }, userProfile._id))
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    return (
        <>
            <Navbar />
            <Container className={classes.mainContainer} maxWidth="xl">
                <Card>
                    <CardHeader
                        avatar={user?.result?._id !== userProfile._id ?
                                <Avatar
                                className={classes.avatar}
                                alt={userProfile.firstName}
                                src={userProfile.imageUrl}
                                sx={{ width: 100, height: 100 }}
                                />
                                :
                                <>
                                <IconButton
                                onClick={handleClick}>
                                    <Tooltip
                                        disableFocusListener
                                        disableTouchListener
                                        title="Click to change avatar"
                                    >  
                                    <Avatar
                                        className={classes.avatar}
                                        alt={userProfile.firstName}
                                        src={userProfile.imageUrl}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    </Tooltip>
                                </IconButton>
                                <input type="file"
                                    accept="image/*"
                                    ref={hiddenFileInput}
                                    onChange={handleAvatarChange}
                                    style={{display:'none'}} 
                                /> 
                                </>
                             
                        }
                        title={<Typography variant="h3" component="h2">{userProfile.firstName + " " + userProfile.lastName}</Typography>}
                        
                    />
                </Card>
                <Card className={classes.paper} elevation={4}>
                    <CardHeader 
                        title={<Typography>User details</Typography>}
                    />
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 1 }}>{userProfile.role}</Typography>
                        <Typography variant="h6" m={1}>Email:</Typography>
                        <Typography variant="h6" m={1} marginLeft={3}>{userProfile.email}</Typography>
                        <Typography variant="h6" m={1}>Faculty:</Typography>
                        <Typography variant="h6" m={1} marginLeft={3}>{userProfile.faculty}</Typography>
                    </CardContent>
                </Card>
                <Card className={classes.paper} elevation={4}>
                    <CardHeader 
                        title={<Typography>Login activity</Typography>}
                    />
                    <CardContent>
                        <Typography variant="h6" m={1}>Account created at:</Typography>
                        <Typography variant="h6" m={1} marginLeft={3}>{new Date(userProfile.createdAt).toLocaleString()} ({moment(userProfile.createdAt).fromNow()})</Typography>
                        <Typography variant="h6" m={1}>Last access at:</Typography>
                        <Typography variant="h6" m={1} marginLeft={3}>{new Date(userProfile.lastLoginAt).toLocaleString()} ({moment(userProfile.lastLoginAt).fromNow()})</Typography>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default Profile;