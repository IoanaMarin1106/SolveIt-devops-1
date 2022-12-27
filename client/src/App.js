import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getProblems } from './actions/problems'

import Navbar from "./components/Navbar/Navbar";
import ProblemEditor from "./components/Problems/ProblemEditor/ProblemEditor";
import Problems from "./components/Problems/Problems";
import ProblemPage from "./components/ProblemPage/ProblemPage";

import { useDispatch } from "react-redux";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ConfirmPage from "./components/ConfirmPage/ConfirmPage";
import UnauthorizedPage from "./components/UnauthorizedPage/UnauthorizedPage";
import TeacherApprovalPage from "./components/TeacherApprovalPage/TeacherApprovalPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import EditProblemPage from "./components/EditProblemPage/EditProblemPage";

const App = () => {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xxl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<LogIn />} />
            <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/favorites" element={<Problems isFavorites={true} />} />
            <Route path="/problems/create" element={<ProblemEditor />} />
            <Route path="/problems/:id" element={<ProblemPage />} />
            <Route path="/problems/:id/edit" element={<EditProblemPage />} />
            <Route path="/profile/:id" element = {<Profile />} />
            <Route path="/users/:id/confirm" element = {<ConfirmPage/>}/>
            <Route path="/users/:id/approveTeacher" element = {<TeacherApprovalPage/>}/>
            <Route path="/users/:id/resetPassword" element = {<ResetPassword/>}/>
            <Route path="/users/:id/changePassword" element = {<ChangePassword/>}/>
            <Route path="/unauthorized" element={<UnauthorizedPage />}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
