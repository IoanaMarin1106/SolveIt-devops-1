const userReducer = (state = { userProfile: null }, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { ...state, userProfile: action.payload.user };
        default:
            return state;
    }
};

export default userReducer;