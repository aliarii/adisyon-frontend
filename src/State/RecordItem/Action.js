import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const getRecordItemById = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_ITEM_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/record/${reqData.id}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECORD_ITEM_BY_ID_SUCCESS, payload: data })
        console.log("get record by id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECORD_ITEM_BY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getRecordItemsByCompanyId = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/record/company/${reqData.companyId}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_SUCCESS, payload: data })
        console.log("get records by company id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const getRecordItemsByDay = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_DAY_REQUEST })
    try {
        const { data } = await api.get(`/api/record/${reqData.companyId}/${reqData.year}/${reqData.month}/${reqData.day}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_DAY_SUCCESS, payload: data })
        console.log("get record items by day", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_DAY_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const getRecordItemsByMonth = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/record/${reqData.companyId}/${reqData.year}/${reqData.month}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_MONTH_SUCCESS, payload: data })
        console.log("get record items by month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECORD_ITEMS_BY_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const createRecordItem = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_RECORD_ITEM_REQUEST })
    try {
        const { data } = await api.post(`/api/record`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.CREATE_RECORD_ITEM_SUCCESS, payload: data })
        console.log("create record item success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_RECORD_ITEM_FAILURE, payload: error })
        console.log("error", error)
    }
}