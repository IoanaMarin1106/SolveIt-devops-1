import React, { useEffect } from "react";
import { Container, Paper, Select, Switch, Tabs, Tab, Toolbar, Typography, CircularProgress, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useDispatch, useSelector } from "react-redux";

import { getBatchesByUserIdAndProblemId } from "../../../actions/batch";

import { languages } from "../../../utils/languages";

const SubmissionsPage = () => {

    const { problem}  = useSelector((state) => state.problems)
    const {batches} = useSelector((state) => state.batch)
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

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
                No submissions found. Submit your code first.
            </Typography>
        </Paper>
        </Container>
    );

    const createDataFromBatch = (batch) => {
        const statuses = batch.submissions.map((submission) => submission.status.id)
        const result = statuses.filter((status) => status !== 3).length === 0 ? "Accepted" : "Wrong Answer";
        
        const tests = `${statuses.filter((status) => status === 3).length}/${batch.numberOfTests}`

        const language = languages.find(lang => lang.id === batch.language).title

        const time = new Date(batch.createdAt).toLocaleString();
        console.log()

        return { result, tests, language, time }
    }
    
    const rows = batches.map(createDataFromBatch)

    return (
        <Container maxWidth="xl" sx={{ paddingTop: '20px' }}>
            <Paper
            style={{ padding: 10, marginBottom: 50 }}
            elevation={4}
            >
                <Typography gutterBottom variant="h4" component="h2" fontWeight="bold">
                    {problem.title}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>RESULT</Typography></TableCell>
                                <TableCell align="center"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>TESTS</Typography></TableCell>
                                <TableCell align="center"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>LANGUAGE</Typography></TableCell>
                                <TableCell align="right"><Typography sx={{ fontWeight: 'medium', fontSize: '24px' }}>TIME</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography sx={row.result === "Accepted" ? {color: "#00cc00"} : {color: "#e62e00"} }>{row.result}</Typography>
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
        </Container>
    );

}

export default SubmissionsPage;