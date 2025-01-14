import * as actionTypes from "./ActionType"

const initialState = {
    cart: null,
    loading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CART_BY_ID_REQUEST:
        case actionTypes.GET_CART_BY_BASKET_ID_REQUEST:
        case actionTypes.CREATE_CART_REQUEST:
        case actionTypes.UPDATE_CART_REQUEST:
        case actionTypes.DELETE_CART_REQUEST:
        case actionTypes.ADD_PRODUCT_TO_CART_REQUEST:
        case actionTypes.UPDATE_CART_PRODUCT_REQUEST:
        case actionTypes.DELETE_CART_PRODUCT_REQUEST:
        case actionTypes.CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_CART_BY_ID_SUCCESS:
        case actionTypes.GET_CART_BY_BASKET_ID_SUCCESS:
        case actionTypes.CREATE_CART_SUCCESS:
        case actionTypes.UPDATE_CART_SUCCESS:
        case actionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
        case actionTypes.UPDATE_CART_PRODUCT_SUCCESS:
        case actionTypes.DELETE_CART_PRODUCT_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
            };

        case actionTypes.DELETE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
            };


        case actionTypes.GET_CART_BY_ID_FAILURE:
        case actionTypes.GET_CART_BY_BASKET_ID_FAILURE:
        case actionTypes.CREATE_CART_FAILURE:
        case actionTypes.UPDATE_CART_FAILURE:
        case actionTypes.DELETE_CART_FAILURE:
        case actionTypes.ADD_PRODUCT_TO_CART_FAILURE:
        case actionTypes.UPDATE_CART_PRODUCT_FAILURE:
        case actionTypes.DELETE_CART_PRODUCT_FAILURE:
        case actionTypes.CLEAR_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}