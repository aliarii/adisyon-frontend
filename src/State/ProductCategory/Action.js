import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const createProductCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PRODUCT_CATEGORY_REQUEST })
    try {
        const { data } = await api.post(`/api/owner/productCategories`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.CREATE_PRODUCT_CATEGORY_SUCCESS, payload: data })
        console.log("create product category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_PRODUCT_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const updateProductCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_CATEGORY_REQUEST })
    try {
        const { data } = await api.put(`/api/owner/productCategories/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_PRODUCT_CATEGORY_SUCCESS, payload: data })
        console.log("update product category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_PRODUCT_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deleteProductCategory = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PRODUCT_CATEGORY_REQUEST })
    try {
        const { data } = await api.put(`/api/owner/productCategories/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS, payload: data })
        console.log("delete product category success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_PRODUCT_CATEGORY_FAILURE, payload: error })
        console.log("error", error)
    }
}