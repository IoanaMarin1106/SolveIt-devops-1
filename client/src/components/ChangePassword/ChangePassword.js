import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Input,
  Paper,
  Tooltip,
  Link,
  CssBaseline,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  changePasswordWithAuth,
} from "../../actions/users";

const ChangePassword = () => {
  const [currentPasswordError, setCurrentPasswordError] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  if (localStorage.getItem("profile") === null || !userProfile) return null;

  if (user?.result?._id !== userProfile._id) {
    navigate("/unauthorized");
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget);

    setCurrentPasswordError(false);
    setNewPasswordError(false);

    const passwordData = {
        currentPassword: data.get('current-password'),
        newPassword: data.get('new-password'),
        confirmNewPassword: data.get('confirm-new-password')
    }

    dispatch(changePasswordWithAuth(passwordData, userProfile._id)).then(data => {

        if (data === "Passwords don't match.") {
          setNewPasswordError(true)
        } else if (data === "Current password doesn't match.") {
          setCurrentPasswordError(true)
        } else {
            setOpen(true);
        }
      });
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Navbar />
      <Container className={classes.mainContainer} maxWidth="xl">
        <Card>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                alt={userProfile.firstName}
                src={userProfile.imageUrl}
                sx={{ width: 100, height: 100 }}
              />
            }
            title={
              <Typography variant="h3" component="h2">
                {userProfile.firstName + " " + userProfile.lastName}
              </Typography>
            }
          />
        </Card>
        <Card className={classes.paper} elevation={4}>
          <CardHeader title={<Typography>Change Password</Typography>} />
          <CardContent>
            <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="current-password"
                  label="Current Password"
                  type="password"
                  id="current-password"
                  autoComplete="current-password"
                  error={currentPasswordError}
                  helperText={currentPasswordError ? "Current password doesn't match." : ""}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="new-password"
                  label="New Password"
                  type="password"
                  id="new-password"
                  error={newPasswordError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm-new-password"
                  label="Confirm New Password"
                  type="password"
                  id="confirm-new-password"
                  error={newPasswordError}
                  helperText={newPasswordError ? "Passwords don't match." : ""}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
            </Container>
          </CardContent>
        </Card>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
              Password changed!
            </Alert>
        </Snackbar>
    </>
  );
};

export default ChangePassword;
