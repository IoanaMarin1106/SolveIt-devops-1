import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, DialogTitle, DialogActions, DialogContent, CardHeader, Link, Box, Container, Paper, Slide, AppBar, Divider, Toolbar, IconButton, CloseIcon, List, Dialog, ListItemText, ListItem, Tabs, Tab, Typography, CircularProgress, Table, TableContainer, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import { languages } from "../../../utils/languages";
import Editor from "@monaco-editor/react";
import { Buffer } from 'buffer'
import { getProblemBatchesForAllUsers } from "../../../actions/problems";
import CommentsSection from "../CommentsSection/CommentsSection";


const StudentsSubmissionsPage = () => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(-1);
    const {problem, problemResults } = useSelector((state) => state.problems)

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [selectedTab, setSetelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSetelectedTab(newValue);
    }

    const styleOfTab = (idx) => {
        if (selectedTab === idx) {
            if (problemResults[selectedRow].result.submissions[idx].status.id === 3)
                return {
                    color: '#00cc00',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }
            else 
                return {
                    color: '#e62e00',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }
        } else {
            if (problemResults[selectedRow].result.submissions[idx].status.id === 3)
                return {
                    color: '#00cc00',
                    fontWeight: 'regular',
                    opacity: '100%'
                }
            else 
                return {
                    color: '#e62e00',
                    fontWeight: 'regular',
                    opacity: '100%'
                }
        }
    
    }

    const colorOfTabIndicator = () => {
        
        if (problemResults[selectedRow].result.submissions[selectedTab].status.id === 3)
            return {
                bgcolor: '#00cc00'
            }
        
        return {
            bgcolor: '#e62e00'
        }
    }

    useEffect(() => {
        dispatch(getProblemBatchesForAllUsers(problem._id));
      }, [dispatch, problem._id]);

    if (problemResults === null)
        return (
            <CircularProgress />
        );
    
     const createDataFromUserResult = (userResult) => {
        const avatar = userResult.avatar;
        const name = `${userResult.firstName} ${userResult.lastName}`;

        if (Object.keys(userResult.result).length === 0 && userResult.result.constructor === Object) {
            const result = "Not answered yet";
            const tests = "-";
            const language = "-";
            const time = "-";
            const link = "";

            return { link, name, avatar, result, tests, language, time };
        }

        const statuses = userResult.result.submissions.map((submission) => submission.status.id)
        const result = statuses.filter((status) => status !== 3).length === 0 ? "Accepted" : "Wrong Answer";
            
        const tests = `${statuses.filter((status) => status === 3).length}/${statuses.length}`
    
        const language = languages.find(lang => lang.id === userResult.result.language).title
    
        const time = new Date(userResult.result.createdAt).toLocaleString();
        
        const link = `/problems/${userResult.result.problemId}/${userResult._id}`;

        return { link, name, avatar, result, tests, language, time }
    }
        
    const rows = problemResults.map(createDataFromUserResult)

    const handleNavigate = (row) => {
        navigate(row.link);
    }
      
    const handleClickOpen = (idx) => {
        setSelectedRow(idx);
    };
      
    const handleClose = () => {
        setSelectedRow(-1);
        setSetelectedTab(0);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
            <Paper
            style={{ padding: 20, marginBottom: 50 }}
            elevation={4}
            >
                <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {problem.title}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>STUDENT</Typography></TableCell>
                                <TableCell><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>RESULT</Typography></TableCell>
                                <TableCell align="center"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>TESTS</Typography></TableCell>
                                <TableCell align="center"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>LANGUAGE</Typography></TableCell>
                                <TableCell align="right"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>TIME</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow
                                onClick={(event) => {
                                    if (row.link !== "")
                                        // navigate(row.link)
                                        handleClickOpen(idx);
                                }}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <CardHeader
                                        avatar={
                                            <Avatar
                                            alt={row.name}
                                            src={row.avatar}
                                            />
                                        }
                                        title={<Typography>{row.name}</Typography>}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography sx={row.result === "Accepted" ? {color: "#00cc00"} : ( row.result === "Not answered yet" ? {color: "#bdbdbd"} : {color: "#e62e00"}) }>{row.result}</Typography>
                                    </TableCell>
                                    <TableCell align="center"><Typography>{row.tests}</Typography></TableCell>
                                    <TableCell align="center"><Typography>{row.language}</Typography></TableCell>
                                    <TableCell align="right"><Typography>{row.time}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Paper>
            <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={selectedRow !== -1}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            >
        <DialogTitle id="scroll-dialog-title">
            {selectedRow !== -1 ?
                <>
                <CardHeader
                avatar={
                    <Avatar
                    alt={rows[selectedRow].name}
                    src={rows[selectedRow].avatar}
                    />
                }
                title={<Typography sx={{ fontSize: '24px' }}>{rows[selectedRow].name}</Typography>}
                />
                <Typography>
                    Submitted: {rows[selectedRow].time}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                    Tests passed: {rows[selectedRow].tests}
                </Typography>
                <Typography 
                sx={rows[selectedRow].result === "Accepted" ? 
                    {fontWeight: "bold", color: "#00cc00"} : 
                    {fontWeight: "bold", color: "#e62e00"} }
                >
                    Status: {rows[selectedRow].result}
                </Typography>
                </>
            :
                <Typography>Default</Typography>
            }

            
        </DialogTitle>
        <DialogContent dividers={true}>
            {selectedRow !== -1 ?
            <>
            <Paper
            style={{ padding: 10, marginBottom: 50, marginTop: 5 }}
            elevation={4}
            >
                <Typography gutterBottom marginTop={1} marginLeft={1} variant="h5" component="h2" fontWeight="bold">
                    Submitted code
                </Typography>
                <Paper>
                    <Editor
                    value={problemResults[selectedRow].result.code}
                    height="400px"
                    language={languages.find(lang => lang.id === problemResults[selectedRow].result.language).key}
                    theme="light"
                    options={{readOnly: "true"}}
                    />
                </Paper>
            </Paper>
            <Paper
            elevation={4}
            style={{ marginBottom: 50, height: 448, flexGrow: 1, display: 'flex' }}
            >
            <Tabs
                orientation="vertical"
                variant="scrollable"    // try "visibleScrollable" instead
                scrollButtons="auto"
                value={selectedTab}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
                textColor="inherit"     // VERY IMPORTANT FOR OVERRIDING COLOR OF THE ACTIVE TAB!
                TabIndicatorProps={{sx: colorOfTabIndicator()}}
            >   
                
                    {problemResults[selectedRow].result.submissions.map((testResult, i) => 
                        <Tab 
                        sx={ styleOfTab(i) }
                        icon={ testResult.status.id === 3 ? <CheckRoundedIcon /> : <ClearRoundedIcon /> } 
                        iconPosition="start" 
                        key={`test${i}`} 
                        label={`Test ${i}`}/>
                    )}

            </Tabs>
            <Box width={"85%"} style={{ overflow: 'auto' }}>
                <Typography marginTop={1} marginLeft={10}>Compiler Message</Typography>
                <div className="ql-snow" style={{ marginLeft: '100px' }}>
                    <div className="ql-editor">
                        <pre className="ql-syntax">{problemResults[selectedRow].result.submissions[selectedTab].status.description}</pre>
                    </div>
                </div>
                <Typography marginTop={1} marginLeft={10}>Input (stdin)</Typography>
                <div className="ql-snow" style={{ marginLeft: '100px' }}>
                    <div className="ql-editor">
                        <pre className="ql-syntax">{Buffer.from(problem.inputFiles[selectedTab].split(',')[1], 'base64').toString()}</pre>
                    </div>
                </div>
                <Typography marginTop={1} marginLeft={10}>Expected Output</Typography>
                <div className="ql-snow" style={{ marginLeft: '100px' }}>
                    <div className="ql-editor">
                        <pre className="ql-syntax">{Buffer.from(problem.outputFiles[selectedTab].split(',')[1], 'base64').toString()}</pre>
                    </div>
                </div> 
                <Typography marginTop={1} marginLeft={10}>Actual Output</Typography>
                <div className="ql-snow" style={{ marginLeft: '100px' }}>
                    <div className="ql-editor">
                        <pre className="ql-syntax">{problemResults[selectedRow].result.submissions[selectedTab].stdout}</pre>
                    </div>
                </div> 
            </Box>

        </Paper>
        <CommentsSection userId={problemResults[selectedRow]._id}/>
        </>
            :
            <Typography>Default</Typography>
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </Container>
    );

}

export default StudentsSubmissionsPage;