import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const createProduct = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST })
    try {
        const { data } = await api.post(`/api/owner/products`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: data })
        console.log("create product success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_PRODUCT_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const updateProduct = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST })
    try {
        const { data } = await api.put(`/api/owner/products/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: data })
        console.log("update product success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_PRODUCT_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deleteProduct = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST })
    try {
        const { data } = await api.put(`/api/owner/products/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: data })
        console.log("delete product success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_PRODUCT_FAILURE, payload: error })
        console.log("error", error)
    }
}