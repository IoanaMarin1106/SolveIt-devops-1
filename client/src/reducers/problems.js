const problems = (state = { problems: null, favorites: null, problem: null, problemResults: null, comments: null }, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {...state, problems: action.payload.data};
        case 'FETCH_FAVORITES':
                return {...state, favorites: action.payload.data};
        case 'FETCH_PROBLEM':
            return { ...state, problem: action.payload };
        case 'CREATE':
            return {...state, problems: [...problems, action.payload]};
        case 'FAVORITE':
            return {...state, problems: problems.map((problem) => (problem._id === action.payload._id) ? action.payload : problem) };
        case 'GET_PROBLEM_RESULTS':
            return {...state, problemResults: action.payload };
        case 'RESET_COMMENTS':
            return {...state, comments: null };
        case 'FETCH_COMMENTS':
            return {...state, comments: action.payload };
        default:
            return state;
    }
}

export default problems;