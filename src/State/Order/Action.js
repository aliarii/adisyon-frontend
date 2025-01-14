import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const getOrderById = (jwt, id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDER_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/order/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_ORDER_BY_ID_SUCCESS, payload: data })
        console.log("getOrderById", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_ORDER_BY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getOrderByBasketId = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDER_BY_BASKET_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/order/basket/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        dispatch({ type: actionTypes.GET_ORDER_BY_BASKET_ID_SUCCESS, payload: data })
        console.log("get Order By Basket Id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_ORDER_BY_BASKET_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getOrdersByCompanyId = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ORDERS_BY_COMPANY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/order/company/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        dispatch({ type: actionTypes.GET_ORDERS_BY_COMPANY_ID_SUCCESS, payload: data })
        console.log("get Order By Basket Id", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_ORDERS_BY_COMPANY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST })
    try {
        const { data } = await api.post(`/api/order`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch(getOrderByBasketId(reqData.data.basketId));
        dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: data })
        console.log("create order success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_ORDER_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const createOrderByCart = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ORDER_BY_CART_REQUEST })
    try {
        const { data } = await api.post(`/api/order/create/cart`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch(getOrderByBasketId(reqData.data.basketId));
        dispatch({ type: actionTypes.CREATE_ORDER_BY_CART_SUCCESS, payload: data })
        console.log("create order by cart success", data)
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_ORDER_BY_CART_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const updateOrder = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/order/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })

        dispatch({ type: actionTypes.UPDATE_ORDER_SUCCESS, payload: data })
        console.log("update order success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_ORDER_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const updateOrderByCart = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ORDER_BY_CART_REQUEST })
    try {
        const { data } = await api.put(`/api/order/update/cart`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch(getOrderById(reqData.jwt, reqData.data.orderId));
        dispatch({ type: actionTypes.UPDATE_ORDER_BY_CART_SUCCESS, payload: data })
        console.log("update order by cart success", data)
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_ORDER_BY_CART_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const deleteOrder = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/order/delete`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.DELETE_ORDER_SUCCESS, payload: data })
        console.log("delete order success", data)
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_ORDER_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const payAllOrders = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.PAY_ALL_ORDERS_REQUEST })
    try {
        const { data } = await api.put(`/api/order/pay/all`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.PAY_ALL_ORDERS_SUCCESS, payload: data })
        console.log("complete order success", data)
    } catch (error) {
        dispatch({ type: actionTypes.PAY_ALL_ORDERS_FAILURE, payload: error })
        console.log("error", error)
    }
}
export const paySelectedOrders = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.PAY_SELECTED_ORDERS_REQUEST })
    try {
        const { data } = await api.put(`/api/order/pay/selected`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.PAY_SELECTED_ORDERS_SUCCESS, payload: data })
        console.log("complete order items success", data)
    } catch (error) {
        dispatch({ type: actionTypes.PAY_SELECTED_ORDERS_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const payAmount = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.PAY_AMOUNT_REQUEST })
    try {
        const { data } = await api.put(`/api/order/pay/amount`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.PAY_AMOUNT_SUCCESS, payload: data })
        console.log("pay amount success", data)
    } catch (error) {
        dispatch({ type: actionTypes.PAY_AMOUNT_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const transferOrders = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.TRANSFER_ORDERS_REQUEST })
    try {
        const { data } = await api.put(`/api/order/transfer`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch({ type: actionTypes.TRANSFER_ORDERS_SUCCESS, payload: data })
        console.log("transfer order success", data)
    } catch (error) {
        dispatch({ type: actionTypes.TRANSFER_ORDERS_FAILURE, payload: error })
        console.log("error", error)
    }
}