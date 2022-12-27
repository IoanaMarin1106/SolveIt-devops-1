import * as api from '../api/index.js'

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(formData);

        dispatch({ type: 'AUTH', data });

        navigate("/", { replace: true });
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        await api.signUp(formData);

        // dispatch({ type: 'AUTH', data });

        navigate("/auth/login");
    } catch (error) {
        console.log(error.message);
        return error.response.data.message;
    }
}