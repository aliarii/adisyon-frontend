import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const getReceiptById = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECEIPT_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/receipt/${reqData.id}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECEIPT_BY_ID_SUCCESS, payload: data })
        console.log("get receipt by id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECEIPT_BY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReceiptsByCompanyId = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECEIPTS_BY_COMPANY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/receipt/company/${reqData.companyId}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_COMPANY_ID_SUCCESS, payload: data })
        console.log("get receipts by company id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_COMPANY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReceiptsByDay = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/receipt/${reqData.companyId}/${reqData.year}/${reqData.month}/${reqData.day}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_SUCCESS, payload: data })
        console.log("get receipts by month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReceiptsByMonth = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/receipt/${reqData.companyId}/${reqData.year}/${reqData.month}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_SUCCESS, payload: data })
        console.log("get receipts by month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_RECEIPTS_BY_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}
