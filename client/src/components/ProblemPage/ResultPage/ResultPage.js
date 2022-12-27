import React, { useEffect } from "react";
import { Box, Container, Paper, Tabs, Tab, Typography, CircularProgress } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useDispatch, useSelector } from "react-redux";

import CommentsSection from "../CommentsSection/CommentsSection";

import { getBatchesByUserIdAndProblemId } from "../../../actions/batch";
import "react-quill/dist/quill.snow.css";
import { languages } from "../../../utils/languages";
import Editor from "@monaco-editor/react";
import { Buffer } from 'buffer'
import { getProblemBatchesForAllUsers } from "../../../actions/problems";

const ResultPage = () => {

    const {problem } = useSelector((state) => state.problems)
    const {batches} = useSelector((state) => state.batch)
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [selectedTab, setSetelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSetelectedTab(newValue);
    }

    const styleOfTab = (idx) => {
        if (selectedTab === idx) {
            if (testResults[idx].status.id === 3)
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
            if (testResults[idx].status.id === 3)
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
        
        if (testResults[selectedTab].status.id === 3)
            return {
                bgcolor: '#00cc00'
            }
        
        return {
            bgcolor: '#e62e00'
        }
    }

    const getTestsPassed = (batchResult) => {
        const statuses = batchResult.submissions.map((submission) => submission.status.id)

        return `${statuses.filter((status) => status === 3).length}/${batchResult.numberOfTests}`
    }

    const getResultMessage = (batchResult) => {
        const statuses = batchResult.submissions.map((submission) => submission.status.id)

        return statuses.filter((status) => status !== 3).length === 0 ? "Accepted" : "Wrong Answer"
    }

    useEffect(() => {
        dispatch(getBatchesByUserIdAndProblemId(user?.result?._id, problem._id));
    }, [dispatch, problem._id, user?.result?._id]);

    if (batches === null)
        return (
            <CircularProgress />
        );
    
    if (batches.length === 0)
        return (
            <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
            <Paper
            style={{ padding: 20, marginBottom: 50 }}
            elevation={4}
            >
                <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {problem.title}
                </Typography>
                <Typography gutterBottom m={2} variant="h5" component="h2">
                    No result found. Submit your code first.
                </Typography>
            </Paper>
            </Container>
        );

    const batchResult = batches[0];
    const testResults = batchResult.submissions;
    
    return (
        <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
            <Paper
            style={{ padding: 10, marginBottom: 50 }}
            elevation={4}
            >
                <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {problem.title}
                </Typography>
                <Typography>
                    Submitted: {new Date(batchResult.createdAt).toLocaleString()}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>Tests passed: {getTestsPassed(batchResult)}</Typography>
                <Typography 
                sx={getResultMessage(batchResult) === "Accepted" ? 
                    {fontWeight: "bold", color: "#00cc00"} : 
                    {fontWeight: "bold", color: "#e62e00"} }
                >
                    Status: {getResultMessage(batchResult)}
                </Typography>

                <Typography gutterBottom marginTop={5} marginLeft={1} variant="h5" component="h2" fontWeight="bold">
                    Submitted code
                </Typography>
                <Paper>
                    <Editor
                    value={batchResult.code}
                    height="400px"
                    language={languages.find(lang => lang.id === batchResult.language).key}
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
                
                    {testResults.map((testResult, i) => 
                        <Tab 
                        sx={ styleOfTab(i) }
                        icon={ testResult.status.id === 3 ? <CheckRoundedIcon /> : <ClearRoundedIcon /> } 
                        iconPosition="start" 
                        key={`test${i}`} 
                        label={`Test ${i}`}/>
                    )}

            </Tabs>
            <Box width={"90%"} style={{ overflow: 'auto' }}>
                <Typography marginTop={1} marginLeft={10}>Compiler Message</Typography>
                <div className="ql-snow" style={{ marginLeft: '100px' }}>
                    <div className="ql-editor">
                        <pre className="ql-syntax">{testResults[selectedTab].status.description}</pre>
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
                        <pre className="ql-syntax">{testResults[selectedTab].stdout}</pre>
                    </div>
                </div> 
            </Box>

        </Paper>
        <CommentsSection userId={user?.result?._id}/>
        </Container>
    );

}

export default ResultPage;