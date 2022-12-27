import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {Snackbar, Alert} from '@mui/material';

import solveitLogo from "../../images/solveit-logo.png";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";
import { requestTeacherAccount } from "../../actions/users";

const pages = ["Problems", "Favorites"];
const studentMenu = ["Profile", "Change Password", "Request Teacher Account", "Logout"];
const teacherMenu = ["Profile", "Change Password", "Logout"];

const Navbar = () => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));
  const [pendingOpen, setPendingOpen] = React.useState(false);
  const [okOpen, setOkOpen] = React.useState(false);
  const [alreadyOpen, setAlreadyOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/', { replace: true });
    setUser(null);
  }

  const handleClose = () => {
    setOkOpen(false);
    setPendingOpen(false);
    setAlreadyOpen(false);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);

    if (event.target.innerText === "Logout") {
      logout();
    } else if (event.target.innerText === "Profile") {
      navigate(`/profile/${user?.result?._id}`);
    } else if (event.target.innerText === "Change Password") {
      navigate(`/users/${user?.result?._id}/changePassword`)
    } else if (event.target.innerText === "Request Teacher Account") {
      dispatch(requestTeacherAccount(user?.result?._id)).then(data => {
        if (data === "Already pending request.") {
          setPendingOpen(true);
        } 
        else if (data === "Already a teacher.") {
          setAlreadyOpen(true);
        }
        else {
          setOkOpen(true);
        }
      })
    }
  };

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
 
  

  return (
    <>
    <CssBaseline/>
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <img
            src={solveitLogo}
            alt="icon"
            height="40px"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />

          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ ml: 1, mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => {
              navigate("/");
            }}
          >
            SolveIt!
          </Typography>
            
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user?.result &&
              
              pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    setAnchorElNav(null);
                    navigate(`/${page.toLowerCase()}`, { replace: true });
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              navigate("/");
            }}
          >
            SolveIt!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user?.result &&
            pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  setAnchorElNav(null);
                  navigate(`/${page.toLowerCase()}`);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user?.result ? (
            <>
            <Typography variant="h6" style={{ marginRight:'10px' }}>{user?.result.firstName}</Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open profile menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.result.firstName}
                    src={user?.result.imageUrl}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user?.result?.role === "Student" ?
                studentMenu.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )) 
                :
                teacherMenu.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
                }
              </Menu>
            </Box>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/auth/login", { replace: true })}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
    <Snackbar open={okOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
      Teacher account request sent!
    </Alert>
  </Snackbar>
  <Snackbar open={pendingOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} variant="filled" severity="warning" sx={{ width: '100%' }}>
      Already pending request! Wait for approval.
    </Alert>
  </Snackbar>
  <Snackbar open={alreadyOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} variant="filled" severity="warning" sx={{ width: '100%' }}>
      Already a teacher! Log out and come back.
    </Alert>
  </Snackbar>
  </>
  );
};

export default Navbar;
