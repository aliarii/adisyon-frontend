import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";
export const getAllCompanies = (token) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_ALL_COMPANIES_REQUEST });
        try {
            const { data } = await api.get("/api/company", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: actionTypes.GET_ALL_COMPANIES_SUCCESS, payload: data });
            console.log("all companies ", data);
        } catch (error) {
            dispatch({ type: actionTypes.GET_ALL_COMPANIES_FAILURE, payload: error });
        }
    };
};
export const getCompanyById = (id, jwt) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_COMPANY_BY_ID_REQUEST });
    try {
        const response = await api.get(`/api/company/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: actionTypes.GET_COMPANY_BY_ID_SUCCESS, payload: response.data });
        console.log("company ", response.data);
    } catch (error) {
        console.log("error", error)
        dispatch({ type: actionTypes.GET_COMPANY_BY_ID_FAILURE, payload: error });
    }
}

export const getCompanyByUserId = (user, jwt) => {
    if (user.role === "ROLE_EMPLOYEE") {
        return getCompanyByEmployeeId(user, jwt);
    }
    else {
        return getCompanyByOwnerId(user, jwt);
    }
};

const getCompanyByOwnerId = (user, jwt) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_COMPANY_BY_USER_ID_REQUEST });
        try {
            const response = await api.get(`/api/company/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get company by owner id ", response.data);
            dispatch({ type: actionTypes.GET_COMPANY_BY_USER_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: actionTypes.GET_COMPANY_BY_USER_ID_FAILURE, payload: error.message, });
        }
    };
};

const getCompanyByEmployeeId = (user, jwt) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_REQUEST });
        try {
            const response = await api.get(`/api/company/employee/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get company by employee id ", response.data);
            dispatch({ type: actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("catch error ", error);
            dispatch({ type: actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_FAILURE, payload: error.message, });
        }
    };
};

export const updateCompany = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_COMPANY_REQUEST });
    try {
        const response = await api.put(`/api/company/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        dispatch({ type: actionTypes.UPDATE_COMPANY_SUCCESS, payload: response.data });
        console.log("update company success ", response.data);
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_COMPANY_FAILURE, payload: error.message, });
        console.log("catch error ", error);
    }
};
