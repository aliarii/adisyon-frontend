import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const createBasket = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_BASKET_REQUEST })
    try {
        const { data } = await api.post(`/api/basket`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.CREATE_BASKET_SUCCESS, payload: data })
        console.log("create Basket success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_BASKET_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const updateBasket = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_BASKET_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_BASKET_SUCCESS, payload: data })
        console.log("update Basket success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_BASKET_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deleteBasket = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_BASKET_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.DELETE_BASKET_SUCCESS, payload: data })
        console.log("delete Basket success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_BASKET_FAILURE, payload: error })
        console.log("error", error)
    }
}


export const getBasketById = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_BASKET_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/basket/${reqData.id}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_BASKET_BY_ID_SUCCESS, payload: data })
        console.log("getBasketById", data)
    }
    catch (error) {
        dispatch({ type: actionTypes.GET_BASKET_BY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getAllBasketsByCompanyId = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/basket/company/${reqData.id}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_SUCCESS, payload: data })
        console.log("getBasketsByCompanyId", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const activateBasket = (jwt, id) => async (dispatch) => {
    dispatch({ type: actionTypes.ACTIVATE_BASKET_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/activate/${id}`, id, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionTypes.ACTIVATE_BASKET_SUCCESS, payload: data })
        console.log("activate Basket success", data)
    } catch (error) {
        dispatch({ type: actionTypes.ACTIVATE_BASKET_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deactivateBasket = (jwt, id) => async (dispatch) => {
    dispatch({ type: actionTypes.DEACTIVATE_BASKET_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/deactivate/${id}`, id, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionTypes.DEACTIVATE_BASKET_SUCCESS, payload: data })
        console.log("deactivate Basket success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DEACTIVATE_BASKET_FAILURE, payload: error })
        console.log("error", error)
    }
}