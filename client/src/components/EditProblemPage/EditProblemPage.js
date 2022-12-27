import { Box, Button, Container, Paper, FormControlLabel, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router";
import { useLocation } from "react-router";

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AdapterDateFns from  '@mui/lab/AdapterDateFns'

import useStyles from "./styles";
import { editProblem } from "../../actions/problems";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import FileBase from "react-file-base64";
import Navbar from "../Navbar/Navbar";


const EditProblemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation()
  const {problem} = state
  const [problemm, setProblemm] = useState(state.problem)
  const [cChecked, setCChecked] = useState(problemm.acceptedLanguages.includes("C"));
  const [cppChecked, setCppChecked] = useState(problemm.acceptedLanguages.includes("C++"));
  const [javaChecked, setJavaChecked] = useState(problemm.acceptedLanguages.includes("Java"));
  const [numberOfTests, setNumberOfTests] = useState(problemm.numberOfTests);
  let inputFiles = [String]
  let outputFiles = [String]
  const [reuploadTests, setReuploadTests] = useState(false)


  const classes = useStyles();
  const dispatch = useDispatch();


  if ( problem === null)
    return;



  const handleSubmit = (e) => {
    e.preventDefault();
    const acceptedLanguages = []
    if (cChecked)
      acceptedLanguages.push("C")
    
    if (cppChecked)
      acceptedLanguages.push("C++")

    if (javaChecked)
      acceptedLanguages.push("Java")

    const newProblem = { ...problemm,
                         numberOfTests: reuploadTests ? numberOfTests : problemm.numberOfTests,
                         inputFiles: reuploadTests ? inputFiles : problemm.inputFiles,
                         outputFiles: reuploadTests ? outputFiles : problemm.outputFiles,
                         acceptedLanguages: acceptedLanguages
                        }
    
    dispatch(editProblem({problem: newProblem}, id)).then(
      // navigate(`/problems/${id}`)
      navigate(`/problems`)
    );

  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="lg">
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 1 }}>
        <Paper className={classes.paper} elevation={4}>
          <Typography m={1} variant="h5">Creating a new problem</Typography>

          <TextField
            sx={{ m: 1 }}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={problemm.title}
            onChange={(e) =>
              setProblemm({ ...problemm, title: e.target.value })
            }
          />
        </Paper>

        <Paper className={classes.paper} elevation={4}>
          <Typography m={1} marginBottom={0} variant="h5">Content</Typography>

          <Container className={classes.container}>
            <ReactQuill
              className={classes.editor}
              modules={modules}
              theme="snow"
              value={problemm.content}
              onChange={(value) => {
                setProblemm({ ...problemm, content: value });
              }}
            />
          </Container>
        </Paper>
        
        <Paper className={classes.paper} elevation={4}>
          <Typography m={1} variant="h5">Configuration</Typography>
          <Typography  m={1} marginTop={2} marginLeft={4} variant="h6">Submission Period</Typography>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox checked={problemm.availableFromEnabled} value={problemm.availableFromEnabled} onChange={() => setProblemm({ ...problemm, availableFromEnabled: !problemm.availableFromEnabled })}/>} label="Available from:" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={problemm.availableFrom}
              onChange={(e) => setProblemm({ ...problemm, availableFrom: new Date(e.toString()) })}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Box>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox checked={problemm.dueDateEnabled} value={problemm.dueDateEnabled} onChange={() => setProblemm({ ...problemm, dueDateEnabled: !problemm.dueDateEnabled })}/>} label="Due date:" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={problemm.dueDate}
              onChange={(e) => setProblemm({ ...problemm, dueDate: new Date(e.toString()) })}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Box>
          <Typography  m={1} marginTop={2} marginLeft={4} variant="h6">Accepted Languages</Typography>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox checked={cChecked} value={cChecked} onChange={() => setCChecked(!cChecked)}/>} label="C" />
            <FormControlLabel control={<Checkbox checked={cppChecked} value={cppChecked} onChange={() => setCppChecked(!cppChecked)}/>} label="C++" />
            <FormControlLabel control={<Checkbox checked={javaChecked} value={javaChecked} onChange={() => setJavaChecked(!javaChecked)}/>} label="Java" />
          </Box>
        </Paper>

        <Paper className={classes.paper} elevation={4}>
          <Typography m={1} marginBottom={2} variant="h5">Test Files</Typography>

          <Container>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Number of tests
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numberOfTests}
                label="numberOfTests"
                onChange={(e) => setNumberOfTests(parseInt(e.target.value, 10))}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox value={reuploadTests} onChange={() => setReuploadTests(!reuploadTests)} />} label={<Typography variant="h6">Reupload tests</Typography>}/>
            <Grid container>
              {[...Array(numberOfTests)].map((_, index) => (
                <Grid key={index + 1} className={classes.testBox}>
                  <Typography variant="h6">{`Test ${index + 1}`}</Typography>
                  <Typography variant="body1">Input File:</Typography>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => inputFiles[index] = base64}
                  />
                  <Typography variant="body1">Output File:</Typography>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => outputFiles[index] = base64}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>

          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Edit
          </Button>
          <Button
            className={classes.buttonSubmit}
            sx={{ marginLeft: 1  }}
            variant="outlined"
            color="primary"
            size="large"
            type="button"
            onClick={() => { navigate(`/problems/${problem._id}`)}}
          >
            Cancel
          </Button>
      </Paper>
      </Box>
    </Container>
    </>
  );
};

export default EditProblemPage;
