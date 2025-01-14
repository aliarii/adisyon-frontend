import * as actionTypes from "./ActionType"

const initialState = {
    basketCategory: null,
    loading: false,
    error: null,
};

export const basketCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BASKET_CATEGORY_REQUEST:
        case actionTypes.UPDATE_BASKET_CATEGORY_REQUEST:
        case actionTypes.DELETE_BASKET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.CREATE_BASKET_CATEGORY_SUCCESS:
        case actionTypes.UPDATE_BASKET_CATEGORY_SUCCESS:
        case actionTypes.DELETE_BASKET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                basketCategory: action.payload,
            };


        case actionTypes.CREATE_BASKET_CATEGORY_FAILURE:
        case actionTypes.UPDATE_BASKET_CATEGORY_FAILURE:
        case actionTypes.DELETE_BASKET_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}