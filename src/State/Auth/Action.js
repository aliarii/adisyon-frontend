
import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const registerOwner = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST })
    try {
        const { data } = await api.post(`/api/auth/register/owner`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);

        reqData.navigate("/")
        reqData.register();
        dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data.jwt })
        console.log("register success", data)

    } catch (error) {
        dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const registerEmployee = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_EMPLOYEE_REQUEST })
    try {
        const { data } = await api.post(`/api/auth/register/employee`, reqData.data)

        dispatch({ type: actionTypes.REGISTER_EMPLOYEE_SUCCESS, payload: data.jwt })
        console.log("register employee success", data)

    } catch (error) {
        // dispatch({ type: actionTypes.REGISTER_EMPLOYEE_FAILURE, payload: error })
        // console.log("error", error)
        const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
        dispatch({ type: actionTypes.REGISTER_EMPLOYEE_FAILURE, payload: { message: errorMessage } });
        console.log("error", error)
    }
}
export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST })
    try {
        if (!reqData.userData.email.includes('@'))
            reqData.userData.email = reqData.userData.email + '@adisyon.com'

        const { data } = await api.post(`/api/auth/login`, reqData.userData)

        if (data.jwt)
            reqData.login(data.jwt);

        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.jwt })
        console.log("login success", data)
    } catch (error) {
        // dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error })
        const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { message: errorMessage } });
        console.log("error", error)
    }
}
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: data })
        console.log("user profile", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });
    try {
        localStorage.clear();
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
        console.log("Logout successful");
    } catch (error) {
        // Dispatch logout failure action
        dispatch({ type: actionTypes.LOGOUT_FAILURE, payload: error });
        console.log("Logout error", error);
    }
};

export const validateToken = (jwt) => async (dispatch) => {
    dispatch({ type: actionTypes.VALIDATE_TOKEN_REQUEST })
    try {
        const { data } = await api.get('/api/auth/validate-token', {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            },
        });

        dispatch({ type: actionTypes.VALIDATE_TOKEN_SUCCESS, payload: data })
        console.log("validate successful: ", data)
        return data;
        //return data; // true if valid, false if not
    } catch (error) {
        dispatch({ type: actionTypes.VALIDATE_TOKEN_FAILURE, payload: error })
        console.error('Token validation error:', error);
        // return false;
        return false;
    }
};
