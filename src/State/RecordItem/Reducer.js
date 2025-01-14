import * as actionTypes from "./ActionType";

const initialState = {
    record: null,
    records: [],
    loading: false,
    error: null,
};

export const recordReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_RECORD_ITEM_BY_ID_REQUEST:
        case actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_REQUEST:
        case actionTypes.GET_RECORD_ITEMS_BY_MONTH_REQUEST:
        case actionTypes.GET_RECORD_ITEMS_BY_DAY_REQUEST:
        case actionTypes.CREATE_RECORD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_RECORD_ITEM_BY_ID_SUCCESS:
        case actionTypes.CREATE_RECORD_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                record: action.payload,
            };
        case actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_SUCCESS:
        case actionTypes.GET_RECORD_ITEMS_BY_DAY_SUCCESS:
        case actionTypes.GET_RECORD_ITEMS_BY_MONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                records: action.payload,
            };

        case actionTypes.GET_RECORD_ITEM_BY_ID_FAILURE:
        case actionTypes.GET_RECORD_ITEMS_BY_COMPANY_ID_FAILURE:
        case actionTypes.GET_RECORD_ITEMS_BY_MONTH_FAILURE:
        case actionTypes.GET_RECORD_ITEMS_BY_DAY_FAILURE:
        case actionTypes.CREATE_RECORD_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}