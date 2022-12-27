import {Fab, Tooltip, Box, Button, Container, FormControl, IconButton, MenuItem, Paper, Select, Switch, Tabs, Tab, Toolbar, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useRef } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from 'buffer'
import Moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Editor from "@monaco-editor/react";

import { useTheme } from "@mui/material/styles";

import { languages } from '../../utils/languages'

import { getProblem } from '../../actions/problems'
import { addSubmission, getSubmissionResult, getSubmissionsBatchResults } from '../../actions/judge0'

import { grey } from "@mui/material/colors";
import useStyles from './styles'
import "react-quill/dist/quill.snow.css";
import Navbar from "../Navbar/Navbar";
import TestsPaper from "./TestsPaper/TestsPaper";
import SubmissionsPage from "./SubmissionsPage/SubmissionsPage";
import StudentsSubmissionsPage from "./StudentsSubmissionsPage/StudentsSubmissionsPage";
import ResultPage from "./ResultPage/ResultPage";

const ProblemPage = () => {
    const thisTheme = useTheme();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [selectedTab, setSetelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSetelectedTab(newValue);
    }

    const handleSubmitButton = (event) => {
        const inputFiles = problem.inputFiles.map(file => (
            Buffer.from(file.split(',')[1], 'base64').toString()
        ))

        const outputFiles = problem.outputFiles.map(file => (
            Buffer.from(file.split(',')[1], 'base64').toString()
        ))
        
        const batchData = [...Array(problem.numberOfTests)].map((_, idx) => (
            {
                source_code: editorText,
                language_id: languages.find(lang => lang.key === language).id,
                stdin: inputFiles[idx],
                expected_output: outputFiles[idx]
            }
        ));
        
        dispatch(getSubmissionsBatchResults({submissions: batchData, userId: user?.result?._id, problemId: problem._id}))
    }

    

    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();

    const [editorText, setEditorText] = useState("");
    const [theme, setTheme] = useState(false);
    const [language, setLanguage] = useState("cpp");

    useEffect(() => {
        dispatch(getProblem(id));
      }, [id, dispatch]);
      
    const { testResults } = useSelector((state) => state.judge0)
    const { problem, comments } = useSelector((state) => state.problems)
    
    if (!problem) return (
        <CircularProgress />
    )

    return (
        <>
        <Navbar />
        <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="Problem" />
                <Tab label="Submissions" />
                <Tab label="My Result" />
                {user?.result?.role === "Teacher" && <Tab label="Students Submissions" />}
        </Tabs>
        { selectedTab === 0 && 
        <Container className={classes.container} maxWidth="xl">
        <Paper
        elevation={4}
        style={{ marginBottom: 50, padding: 20 }}
        > 
            <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                {problem.title}
            </Typography>
            <Typography marginLeft={2} variant="h6">Author: {problem.creator}</Typography>
            {problem.dueDateEnabled &&
            <Typography marginLeft={2} variant="h6">
                Due Date: {new Date(problem.dueDate).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} ({Moment(problem.dueDate).fromNow()})
            </Typography>}
        </Paper>

        <Paper
        style={{ padding: 10, marginBottom: 50 }}
        elevation={4}
        >


        <Typography component="div" className="ql-snow">
            <div className="ql-editor">
                <div dangerouslySetInnerHTML={{__html: problem.content}}></div>
            </div>
        </Typography>
        </Paper>

        <Paper
        elevation={4}
        style={{ marginBottom: 50 }}
        > 
            <Toolbar
            style={{ background: grey[200] }}
            >
                <Typography>Light</Typography>
                <Switch 
                onChange={() => setTheme(!theme)}
                />
                <Typography>Dark</Typography>

                <Typography marginLeft={20}>Language:</Typography>
                <FormControl sx={{ marginLeft: 2, minWidth: 120}}>
                    <Select
                    // value={ languages.find(lang => lang.title === language) ? language : languages.find(lang => lang.title === problem.acceptedLanguages[0]).key}
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    displayEmpty
                    >
                        { problem.acceptedLanguages.includes("C") && <MenuItem value={"cpp"}>C</MenuItem>}
                        { problem.acceptedLanguages.includes("C++") && <MenuItem value={"cpp2"}>C++</MenuItem>}
                        { problem.acceptedLanguages.includes("Java") && <MenuItem value={"java"}>Java</MenuItem>}
                    </Select>
                </FormControl>

            </Toolbar>
 
            <Editor
            height="400px"
            language={language === "cpp2" ? "cpp" : language}
            theme={!theme ? "light" : "vs-dark"}
            onChange={(text) => setEditorText(text)} 
            />


            {(problem.dueDateEnabled && new Date(problem.dueDate) < new Date()) ?
                <Tooltip
                followCursor
                disableFocusListener
                disableTouchListener
                title={`Overdue problem. Due date ${new Date(problem.dueDate).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}`}
            > 
                <Box>
                    <Button sx={{ margin: 1 }} variant="contained" disabled>
                        Submit Code
                    </Button>
                </Box>
            </Tooltip>
            :
            <Button sx={{ margin: 1 }} variant="contained" onClick={handleSubmitButton}>
               Submit Code
            </Button>}

        </Paper>

        <TestsPaper problem={problem} code={editorText} />
        {user?.result?.role === "Teacher" && <Fab
        sx={{ position: 'fixed',
        alignSelf: 'flex-end',
        bottom: thisTheme.spacing(2),
        right: thisTheme.spacing(2), }}
        color="primary"
        aria-label="add"
        onClick={() => {
          navigate(`/problems/${problem._id}/edit`, { state: { problem: problem } });
        }}
      >
        <EditIcon />
      </Fab>}
    </Container>
    }
        { selectedTab === 1 && 
            <SubmissionsPage /> 
        }
        
        { selectedTab === 2 && 
            <ResultPage />
        }

        { selectedTab === 3 && 
            <StudentsSubmissionsPage />
        }
        </>
        
    );
};

export default ProblemPage;