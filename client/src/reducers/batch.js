const batchReducer = (state = { batches: null }, action) => {
    switch (action.type) {
        case 'FETCH_BATCHES':
            return { ...state, batches: action.payload };
        default:
            return state;
    }
};

export default batchReducer;