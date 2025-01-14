import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const deleteEmployee = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_EMPLOYEE_REQUEST })
    try {
        const { data } = await api.put(`/api/employee/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: actionTypes.DELETE_EMPLOYEE_SUCCESS, payload: data.jwt })
        console.log("delete employee success", data)

    } catch (error) {
        dispatch({ type: actionTypes.DELETE_EMPLOYEE_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const updateEmployee = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_EMPLOYEE_REQUEST })
    try {
        const { data } = await api.put(`/api/employee/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_EMPLOYEE_SUCCESS, payload: data.jwt })
        console.log("update employee success", data)

    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_EMPLOYEE_FAILURE, payload: error })
        console.log("error", error)
    }
}