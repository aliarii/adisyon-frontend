import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const createBasketCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_BASKET_CATEGORY_REQUEST })
    try {
        const { data } = await api.post(`/api/basket/category`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.CREATE_BASKET_CATEGORY_SUCCESS, payload: data })
        console.log("create basket category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_BASKET_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const updateBasketCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_BASKET_CATEGORY_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/category/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_BASKET_CATEGORY_SUCCESS, payload: data })
        console.log("update basket category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_BASKET_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deleteBasketCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_BASKET_CATEGORY_REQUEST })
    try {
        const { data } = await api.put(`/api/basket/category/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.DELETE_BASKET_CATEGORY_SUCCESS, payload: data })
        console.log("delete basket category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_BASKET_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}
