import * as api from '../api'

export const addBatch = (batch) => async (dispatch) => {
    try {
         const newBatch = await api.addBatch(batch);

    } catch (error) {
        console.log(error.message);
    }
}

export const getBatchesByUserIdAndProblemId = (userId, problemId) => async (dispatch) => {
    try {
        const { data } = await api.getBatchesByUserIdAndProblemId(userId, problemId);

        const batches = []

        for (let i = 0; i < data.length; i++) {
            const tokens = data[i].submissions.join(",");
            const res = await api.getSubmissionsBatch(tokens);

            batches.push({...data[i], submissions: res.data.submissions})
        }

        dispatch({ type: 'FETCH_BATCHES', payload: batches });
    } catch (error) {
        console.log(error.message);
    }
}