import * as actionTypes from "./ActionType";

const initialState = {
    reportByDay: null,
    reportByMonth: null,
    reportByYear: null,
    reportsByMonth: [],
    reportBySelectedDay: null,
    reportBySelectedMonth: null,
    loading: false,
    error: null,
};

export const reportReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_REPORT_BY_DAY_REQUEST:
        case actionTypes.GET_REPORT_BY_MONTH_REQUEST:
        case actionTypes.GET_REPORT_BY_YEAR_REQUEST:
        case actionTypes.GET_REPORTS_BY_MONTH_REQUEST:
        case actionTypes.GET_REPORT_BY_SELECTED_DAY_REQUEST:
        case actionTypes.GET_REPORT_BY_SELECTED_MONTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_REPORT_BY_DAY_SUCCESS:
            return {
                ...state,
                loading: false,
                reportByDay: action.payload,
            };
        case actionTypes.GET_REPORT_BY_MONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                reportByMonth: action.payload,
            };
        case actionTypes.GET_REPORT_BY_YEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                reportByYear: action.payload,
            };
        case actionTypes.GET_REPORTS_BY_MONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                reportsByMonth: action.payload,
            };
        case actionTypes.GET_REPORT_BY_SELECTED_DAY_SUCCESS:
            return {
                ...state,
                loading: false,
                reportBySelectedDay: action.payload,
            };
        case actionTypes.GET_REPORT_BY_SELECTED_MONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                reportBySelectedMonth: action.payload,
            };

        case actionTypes.GET_REPORT_BY_DAY_FAILURE:
        case actionTypes.GET_REPORT_BY_MONTH_FAILURE:
        case actionTypes.GET_REPORT_BY_YEAR_FAILURE:
        case actionTypes.GET_REPORTS_BY_MONTH_FAILURE:
        case actionTypes.GET_REPORT_BY_SELECTED_DAY_FAILURE:
        case actionTypes.GET_REPORT_BY_SELECTED_MONTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}