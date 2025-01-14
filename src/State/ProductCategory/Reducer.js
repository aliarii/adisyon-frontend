import * as actionTypes from "./ActionType";

const initialState = {
    productCategory: null,
    loading: false,
    error: null,
};

export const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CREATE_PRODUCT_CATEGORY_REQUEST:
        case actionTypes.UPDATE_PRODUCT_CATEGORY_REQUEST:
        case actionTypes.DELETE_PRODUCT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };


        case actionTypes.CREATE_PRODUCT_CATEGORY_SUCCESS:
        case actionTypes.UPDATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                productCategory: action.payload,
            };

        case actionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                productCategory: null,
            };

        case actionTypes.CREATE_PRODUCT_CATEGORY_FAILURE:
        case actionTypes.UPDATE_PRODUCT_CATEGORY_FAILURE:
        case actionTypes.DELETE_PRODUCT_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}