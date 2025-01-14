import * as actionTypes from "./ActionType"

const initialState = {
    basket: null,
    baskets: [],
    loading: false,
    error: null,
};

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BASKET_REQUEST:
        case actionTypes.UPDATE_BASKET_REQUEST:
        case actionTypes.DELETE_BASKET_REQUEST:
        case actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_REQUEST:
        case actionTypes.GET_BASKET_BY_ID_REQUEST:
        case actionTypes.ACTIVATE_BASKET_REQUEST:
        case actionTypes.DEACTIVATE_BASKET_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                baskets: action.payload,
            };

        case actionTypes.CREATE_BASKET_SUCCESS:
        case actionTypes.UPDATE_BASKET_SUCCESS:
        case actionTypes.GET_BASKET_BY_ID_SUCCESS:
        case actionTypes.ACTIVATE_BASKET_SUCCESS:
        case actionTypes.DEACTIVATE_BASKET_SUCCESS:
            return {
                ...state,
                loading: false,
                basket: action.payload,
            };
        case actionTypes.DELETE_BASKET_SUCCESS:
            return {
                ...state,
                loading: false,
                basket: null,
            };

        case actionTypes.CREATE_BASKET_FAILURE:
        case actionTypes.UPDATE_BASKET_FAILURE:
        case actionTypes.DELETE_BASKET_FAILURE:
        case actionTypes.GET_ALL_BASKETS_BY_COMPANY_ID_FAILURE:
        case actionTypes.GET_BASKET_BY_ID_FAILURE:
        case actionTypes.ACTIVATE_BASKET_FAILURE:
        case actionTypes.DEACTIVATE_BASKET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}