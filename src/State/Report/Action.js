import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const getReportByDay = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORT_BY_DAY_REQUEST })
    try {
        const { data } = await api.get(`/api/report/day/${reqData.companyId}/${reqData.date}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORT_BY_DAY_SUCCESS, payload: data })
        console.log("get report by day", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORT_BY_DAY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReportByMonth = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORT_BY_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/report/month/${reqData.companyId}/${reqData.year}/${reqData.month}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORT_BY_MONTH_SUCCESS, payload: data })
        console.log("get report by month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORT_BY_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReportByYear = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORT_BY_YEAR_REQUEST })
    try {
        const { data } = await api.get(`/api/report/year/${reqData.companyId}/${reqData.year}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORT_BY_YEAR_SUCCESS, payload: data })
        console.log("get report by year", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORT_BY_YEAR_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReportsByMonth = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORTS_BY_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/report/${reqData.companyId}/${reqData.year}/${reqData.month}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORTS_BY_MONTH_SUCCESS, payload: data })
        console.log("get reports by month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORTS_BY_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReportBySelectedDay = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_DAY_REQUEST })
    try {
        const { data } = await api.get(`/api/report/day/${reqData.companyId}/${reqData.date}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_DAY_SUCCESS, payload: data })
        console.log("get report by selected day", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_DAY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getReportBySelectedMonth = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_MONTH_REQUEST })
    try {
        const { data } = await api.get(`/api/report/month/${reqData.companyId}/${reqData.year}/${reqData.month}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_MONTH_SUCCESS, payload: data })
        console.log("get report by selected month", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_REPORT_BY_SELECTED_MONTH_FAILURE, payload: error })
        console.log("error", error)
    }
}