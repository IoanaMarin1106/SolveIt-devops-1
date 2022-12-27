import * as api from '../api'

export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(id);

        dispatch({ type: 'GET_USER', payload: { user: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserByEmail = (email) => async (dispatch) => {
    try {
        const { data } = await api.getUserByEmail(email);

        dispatch({ type: 'GET_USER', payload: { user: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserProfile = (newUser, id) => async (dispatch) => {
    try {
        const { data } = await api.updateUserProfile(newUser, id);

        dispatch({ type: 'GET_USER', payload: { user: data } });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUserAvatar = (avatar, id) => async (dispatch) => {
    try {
        const newUser = (await api.updateUserAvatar(avatar, id)).data;
        const user = JSON.parse(localStorage.getItem('profile'))
        const data = {...user, result: newUser}

        dispatch({ type: 'SET_LOCAL_STORAGE', data });   // CHECK HERE reset local storage
        dispatch({ type: 'GET_USER', payload: { user: newUser } });
    } catch (error) {
        console.log(error.message);
    }
}

export const verifyUser = (id) => async (dispatch) => {
    try {
        await api.verifyUser(id);
    } catch (error) {
        console.log(error.message);
    }
}

export const approveTeacher = (id) => async (dispatch) => {
    try {
        await api.verifyUser(id);
        await api.confirmTeacherApproval(id);

    } catch (error) {
        console.log(error.message);
    }
}

export const sendResetPasswordLink = (email) => async (dispatch) => {
    try {
        const { data } = await api.getUserByEmail(email);

        await api.sendResetPasswordLink(data._id);

    } catch (error) {
        console.log(error.response.data.message)
        return error.response.data.message;
    }
}

export const changePasswordWithoutAuth = (password, id) => async (dispatch) => {
    try {
        await api.changePassword(password, id);
    } catch (error) {
        console.log(error.message)
    }
}

export const changePasswordWithAuth = (passwordData, id) => async (dispatch) => {
    try {
        const { data } = await api.changePasswordWithAuth(passwordData, id);

        dispatch({ type: 'AUTH', data })
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
}

export const requestTeacherAccount = (id) => async (dispatch) => {
    try {
        const { data } = await api.requestTeacherAccount(id)

        dispatch({ type: 'AUTH', data })
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
}