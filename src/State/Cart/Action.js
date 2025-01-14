import { api } from "../../Config/api";
import * as actionTypes from "./ActionType";

export const getCartById = (jwt, id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_CART_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch({ type: actionTypes.GET_CART_BY_ID_SUCCESS, payload: data })
        console.log("getCartById", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_CART_BY_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const getCartByBasketId = (id) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_CART_BY_BASKET_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/cart/basket/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        dispatch({ type: actionTypes.GET_CART_BY_BASKET_ID_SUCCESS, payload: data })
        console.log("getCartByBasketId", data)
    } catch (error) {
        dispatch({ type: actionTypes.GET_CART_BY_BASKET_ID_FAILURE, payload: error })
        console.log("error", error)
    }
}


export const createCart = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_CART_REQUEST })
    try {
        const { data } = await api.post(`/api/cart`, { basket: reqData.basket }, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`
            }
        })
        dispatch(getCartByBasketId(reqData.basket.id));
        dispatch({ type: actionTypes.CREATE_CART_SUCCESS, payload: data })
        console.log("create cart success", data)

    } catch (error) {
        dispatch({ type: actionTypes.CREATE_CART_FAILURE, payload: error })
        console.log("error", error)
    }
}

export const clearCart = (jwt, id) => async (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_CART_REQUEST });
    try {
        const { data } = await api.put(`/api/cart/clear/${id}`, id, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({ type: actionTypes.CLEAR_CART_SUCCESS, payload: data });
        console.log("clear cart ", data)
    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: actionTypes.CLEAR_CART_FAILURE, payload: error.message });
    }
};
export const addProductToCart = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART_REQUEST });
    try {
        const { data } = await api.put(`/api/cart/product/add`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        console.log("add product to cart ", data)
        dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS, payload: data });
    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART_FAILURE, payload: error.message });
    }
};
export const updateCartProduct = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_CART_PRODUCT_REQUEST });
    try {
        const { data } = await api.put(`/api/cart/product/update`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        console.log("update cart product ", data)
        dispatch({ type: actionTypes.UPDATE_CART_PRODUCT_SUCCESS, payload: data });

    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: actionTypes.UPDATE_CART_PRODUCT_FAILURE, payload: error.message });
    }
};
export const deleteProductFromCart = (reqData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CART_PRODUCT_REQUEST });
    console.log(reqData.data);

    try {
        const { data } = await api.delete(`/api/cart/product/delete`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
            data: reqData.data,
        });
        console.log("delete cart product success", data)
        dispatch({ type: actionTypes.DELETE_CART_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        console.log("catch error ", error)
        dispatch({ type: actionTypes.DELETE_CART_PRODUCT_FAILURE, payload: error.message });
    }
};

