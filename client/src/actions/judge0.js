import * as api from '../api'
import { languages } from '../utils/languages';

export const addSubmission = (submissionData) => async (dispatch) => {
    try {
        const res = await api.addSubmission(submissionData);
        console.log(res.data.token)

        dispatch({ type: 'POST_SUBMISSION', payload: res.data.token })
    } catch (error) {
        console.log(error.message)
    }
}

export const getSubmission = (id) => async (dispatch) => {
    try {
        const res = await api.getSubmission(id);


        dispatch({ type: 'GET_RESULT', payload: res.data.stdout })
    } catch (error) {
        console.log(error.message)
    }
}

export const getSubmissionResult = (submissionData) => async (dispatch) => {
    try {
        const submission = await api.addSubmission(submissionData);

        let res = await api.getSubmission(submission.data.token);
        
        while (res.data.status.id === 1 || res.data.status.id === 2) {
            res = await api.getSubmission(submission.data.token);
        }
        dispatch({ type: 'GET_RESULT', payload: res.data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getSubmissionsBatchResults = (batchData) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })

        const {submissions, userId, problemId} = batchData;

        const batchTokens = await api.postSubmissionsBatch({submissions: submissions});

        if (batchTokens.status !== 201) {
            console.log("Something went wrong with evaluation!")
            return;
        }

        const tokens = batchTokens.data.map(batchToken => batchToken.token).join(",");
        
        let res = await api.getSubmissionsBatch(tokens);
        let statuses = res.data.submissions.map(submission => submission.status.id)
        while (statuses.includes(1) || statuses.includes(2)) {
            res = await api.getSubmissionsBatch(tokens);
            statuses = res.data.submissions.map(submission => submission.status.id)
        }

        const batch = {
            userId: userId,
            problemId: problemId,
            code: submissions[0].source_code,
            createdAt: new Date(),
            language: submissions[0].language_id,
            numberOfTests: submissions.length,
            submissions: batchTokens.data.map(batchToken => batchToken.token)
        }

        const { data } = await api.addBatch(batch);
        await api.updateUserResult(problemId, userId, { batch: data })

        dispatch({ type: 'FETCH_TEST_RESULTS', payload: res.data.submissions })
        dispatch({ type: 'END_LOADING' })
    } catch (error) {
        dispatch({ type: 'END_LOADING' })
        console.log(error)
    }
}
