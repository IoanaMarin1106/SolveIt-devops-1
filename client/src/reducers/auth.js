// import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case 'AUTH':

      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data, authorized: true };
    case 'SET_LOCAL_STORAGE': 
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return state;
    case 'LOGOUT':
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;