import { Box, Button, Container, Paper, FormControlLabel, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router";

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AdapterDateFns from  '@mui/lab/AdapterDateFns'

import useStyles from "./styles";
import { createProblem } from "../../../actions/problems";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import FileBase from "react-file-base64";
import Navbar from "../../Navbar/Navbar";

const ProblemEditor = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))
  const [cChecked, setCChecked] = React.useState(false)
  const [cppChecked, setCppChecked] = React.useState(false)
  const [javaChecked, setJavaChecked] = React.useState(false)
  const [problemData, setProblemData] = useState({
    title: "",
    content: "",
    creator: "",
    createdAt: "",
    numberOfTests: 1,
    inputFiles: [String],
    outputFiles: [String],
    availableFromEnabled: false,
    availableFrom: new Date(),
    dueDateEnabled: false,
    dueDate: new Date(),
    acceptedLanguages: [],
  });
  const [numberOfTests, setNumberOfTests] = useState(1);

  let inputFiles = [String];
  let outputFiles = [String];

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const acceptedLanguages = []
    if (cChecked)
      acceptedLanguages.push("C")
    
    if (cppChecked)
      acceptedLanguages.push("C++")

    if (javaChecked)
      acceptedLanguages.push("Java")

    const newProblem = { ...problemData,
                         creator: `${user?.result?.firstName} ${user?.result?.lastName}`,
                         createdAt: new Date(),
                         numberOfTests: numberOfTests,
                         inputFiles: inputFiles,
                         outputFiles: outputFiles,
                         acceptedLanguages: acceptedLanguages
                        }
    
    dispatch(createProblem(newProblem)).then(
      navigate(`/problems/`)
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
            value={problemData.title}
            onChange={(e) =>
              setProblemData({ ...problemData, title: e.target.value })
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
              onChange={(value) => {
                setProblemData({ ...problemData, content: value });
              }}
            />
          </Container>
        </Paper>
        
        <Paper className={classes.paper} elevation={4}>
          <Typography m={1} variant="h5">Configuration</Typography>
          <Typography  m={1} marginTop={2} marginLeft={4} variant="h6">Submission Period</Typography>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox value={problemData.availableFromEnabled} onChange={() => setProblemData({ ...problemData, availableFromEnabled: !problemData.availableFromEnabled })}/>} label="Available from:" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={problemData.availableFrom}
              onChange={(e) => setProblemData({ ...problemData, availableFrom: new Date(e.toString()) })}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Box>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox value={problemData.dueDateEnabled} onChange={() => setProblemData({ ...problemData, dueDateEnabled: !problemData.dueDateEnabled })}/>} label="Due date:" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={problemData.dueDate}
              onChange={(e) => setProblemData({ ...problemData, dueDate: new Date(e.toString()) })}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Box>
          <Typography  m={1} marginTop={2} marginLeft={4} variant="h6">Accepted Languages</Typography>
          <Box m={1} marginLeft={5} >
            <FormControlLabel control={<Checkbox value={cChecked} onChange={() => setCChecked(!cChecked)}/>} label="C" />
            <FormControlLabel control={<Checkbox value={cppChecked} onChange={() => setCppChecked(!cppChecked)}/>} label="C++" />
            <FormControlLabel control={<Checkbox value={javaChecked} onChange={() => setJavaChecked(!javaChecked)}/>} label="Java" />
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
            Create
          </Button>
      </Paper>
      </Box>
    </Container>
    </>
  );
};

export default ProblemEditor;
