const judge0Reducer = (state = { isLoading: false, testResults: [], submissionToken: null, submissionResult: null }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'GET_RESULT':
            return { ...state, submissionResult: action.payload };
        case 'POST_SUBMISSION':
            console.log("Reducer: " + action.payload)
            return { ...state, submissionToken: action.payload };
        case 'FETCH_TEST_RESULTS':
            return { ...state, testResults: action.payload };
        case 'CLEAR_TEST_RESULTS':
            return { ...state, testResults: [] };
        default:
            return state;
    }
};

export default judge0Reducer;