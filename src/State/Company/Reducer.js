import * as actionTypes from "./ActionType"

const initialState = {
    companies: [],
    company: null,
    loading: false,
    error: null,
};
export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_COMPANIES_REQUEST:
        case actionTypes.GET_COMPANY_BY_ID_REQUEST:
        case actionTypes.GET_COMPANY_BY_USER_ID_REQUEST:
        case actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_REQUEST:
        case actionTypes.ACTIVATE_BASKET_REQUEST:
        case actionTypes.DEACTIVATE_BASKET_REQUEST:
        case actionTypes.UPDATE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_ALL_COMPANIES_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: action.payload,
            };

        case actionTypes.GET_COMPANY_BY_ID_SUCCESS:
        case actionTypes.GET_COMPANY_BY_USER_ID_SUCCESS:
        case actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_SUCCESS:
        case actionTypes.UPDATE_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                company: action.payload,
            };

        case actionTypes.ACTIVATE_BASKET_SUCCESS:
        case actionTypes.DEACTIVATE_BASKET_SUCCESS:
            return {
                ...state,
                loading: false,
                company: { ...state.company, baskets: state.company.baskets.map(basket => basket.id === action.payload.id ? action.payload : basket) },
            };

        case actionTypes.GET_ALL_COMPANIES_FAILURE:
        case actionTypes.GET_COMPANY_BY_ID_FAILURE:
        case actionTypes.GET_COMPANY_BY_USER_ID_FAILURE:
        case actionTypes.GET_COMPANY_BY_EMPLOYEE_ID_FAILURE:
        case actionTypes.ACTIVATE_BASKET_FAILURE:
        case actionTypes.DEACTIVATE_BASKET_FAILURE:
        case actionTypes.UPDATE_COMPANY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}