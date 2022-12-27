import React, { useEffect, useRef } from "react";

import { Paper, Box, Tabs, Tab, CircularProgress, Typography, Skeleton } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Editor, { DiffEditor } from "@monaco-editor/react";
import { Buffer } from 'buffer'

import { useDispatch, useSelector } from "react-redux";

import { lightGreen } from "@mui/material/colors"

import useStyles from './styles'
import "react-quill/dist/quill.snow.css";
import { addBatch } from "../../../actions/batch";


const TestsPaper = ({ problem, code }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedTab, setSetelectedTab] = React.useState(0);
    const testsRef = useRef();

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
        if (isLoading)
            return {
                bgcolor: '#808080'
            }
        
        if (testResults[selectedTab].status.id === 3)
            return {
                bgcolor: '#00cc00'
            }
        
        return {
            bgcolor: '#e62e00'
        }
    }

    const { isLoading, testResults } = useSelector((state) => state.judge0)
    const user = JSON.parse(localStorage.getItem('profile'));

    
    // useEffect(() => {
    //     if (testResults.length > 0 && !isLoading) {
    //         const tokens = testResults.map((testResult) => testResult.token)
    //         const batch = {
    //             userId: user?.result?._id,
    //             problemId: problem._id,
    //             code: code,
    //             numberOfTests: problem.numberOfTests,
    //             submissions: tokens
    //         }
    //         console.log(batch)
    //         dispatch(addBatch(batch));
    //     }
    // }, [submissionCount]);

    if (testResults.length === 0 && !isLoading)
        return;

    // if (testResults.length > 0 && isLoading)
    //     console.log(testResults);

    return (
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
                ref={testsRef}
            >   
                { (isLoading) ?
                    [...Array(problem.numberOfTests)].map((_, i) =>
                        <Tab 
                        sx={ selectedTab === i ? 
                            {
                                color: '#808080',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }
                            : 
                            {
                                color: '#808080',
                                fontWeight: 'regular',
                                opacity: '100%'
                            } 
                        } 
                        icon={<CircularProgress sx={{ color: '#b3b3b3' }}/>} 
                        iconPosition="start" 
                        key={`test${i + 1}`} 
                        label={`Test ${i + 1}`} />
                    ) :
                    testResults.map((testResult, i) => 
                        <Tab 
                        sx={ styleOfTab(i) }
                        icon={ testResult.status.id === 3 ? <CheckRoundedIcon /> : <ClearRoundedIcon /> } 
                        iconPosition="start" 
                        key={`test${i + 1}`} 
                        label={`Test ${i + 1}`}/>
                    )
                }

            </Tabs>
            {(testResults.length !== 0 && !isLoading) ?
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
            :
            <CircularProgress sx={{ color: '#b3b3b3' }}/>
            }

        </Paper>
    );
}

export default TestsPaper;