import * as actionTypes from "./ActionType";

const initialState = {
    product: null,
    loading: false,
    error: null,
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CREATE_PRODUCT_REQUEST:
        case actionTypes.UPDATE_PRODUCT_REQUEST:
        case actionTypes.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };


        case actionTypes.CREATE_PRODUCT_SUCCESS:
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            };

        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: null,
            };

        case actionTypes.CREATE_PRODUCT_FAILURE:
        case actionTypes.UPDATE_PRODUCT_FAILURE:
        case actionTypes.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}