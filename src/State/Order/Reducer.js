import * as actionTypes from "./ActionType";

const initialState = {
    order: null,
    orders: [],
    loading: false,
    error: null,
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_ORDER_BY_ID_REQUEST:
        case actionTypes.GET_ORDER_BY_BASKET_ID_REQUEST:
        case actionTypes.GET_ORDERS_BY_COMPANY_ID_REQUEST:
        case actionTypes.CREATE_ORDER_REQUEST:
        case actionTypes.UPDATE_ORDER_REQUEST:
        case actionTypes.DELETE_ORDER_REQUEST:
        case actionTypes.PAY_ALL_ORDERS_REQUEST:
        case actionTypes.PAY_SELECTED_ORDERS_REQUEST:
        case actionTypes.PAY_AMOUNT_REQUEST:
        case actionTypes.TRANSFER_ORDERS_REQUEST:
        case actionTypes.UPDATE_ORDER_BY_CART_REQUEST:
        case actionTypes.CREATE_ORDER_BY_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_ORDER_BY_ID_SUCCESS:
        case actionTypes.GET_ORDER_BY_BASKET_ID_SUCCESS:
        case actionTypes.CREATE_ORDER_SUCCESS:
        case actionTypes.UPDATE_ORDER_SUCCESS:
        case actionTypes.PAY_ALL_ORDERS_SUCCESS:
        case actionTypes.PAY_SELECTED_ORDERS_SUCCESS:
        case actionTypes.PAY_AMOUNT_SUCCESS:
        case actionTypes.TRANSFER_ORDERS_SUCCESS:
        case actionTypes.UPDATE_ORDER_BY_CART_SUCCESS:
        case actionTypes.CREATE_ORDER_BY_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };

        case actionTypes.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: null,
            };

        case actionTypes.GET_ORDERS_BY_COMPANY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case actionTypes.GET_ORDER_BY_ID_FAILURE:
        case actionTypes.GET_ORDER_BY_BASKET_ID_FAILURE:
        case actionTypes.GET_ORDERS_BY_COMPANY_ID_FAILURE:
        case actionTypes.CREATE_ORDER_FAILURE:
        case actionTypes.UPDATE_ORDER_FAILURE:
        case actionTypes.DELETE_ORDER_FAILURE:
        case actionTypes.PAY_ALL_ORDERS_FAILURE:
        case actionTypes.PAY_SELECTED_ORDERS_FAILURE:
        case actionTypes.PAY_AMOUNT_FAILURE:
        case actionTypes.TRANSFER_ORDERS_FAILURE:
        case actionTypes.UPDATE_ORDER_BY_CART_FAILURE:
        case actionTypes.CREATE_ORDER_BY_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}