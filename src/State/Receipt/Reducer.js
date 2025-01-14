import * as actionTypes from "./ActionType";

const initialState = {
    receipt: null,
    receipts: [],
    loading: false,
    error: null,
};

export const receiptReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_RECEIPT_BY_ID_REQUEST:
        case actionTypes.GET_RECEIPTS_BY_COMPANY_ID_REQUEST:
        case actionTypes.GET_RECEIPTS_BY_DAY_REQUEST:
        case actionTypes.GET_RECEIPTS_BY_MONTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_RECEIPT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                receipt: action.payload,
            };
        case actionTypes.GET_RECEIPTS_BY_COMPANY_ID_SUCCESS:
        case actionTypes.GET_RECEIPTS_BY_DAY_SUCCESS:
        case actionTypes.GET_RECEIPTS_BY_MONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                receipts: action.payload,
            };

        case actionTypes.GET_RECEIPT_BY_ID_FAILURE:
        case actionTypes.GET_RECEIPTS_BY_COMPANY_ID_FAILURE:
        case actionTypes.GET_RECEIPTS_BY_DAY_FAILURE:
        case actionTypes.GET_RECEIPTS_BY_MONTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}