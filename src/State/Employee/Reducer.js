import * as actionTypes from "./ActionType";

const initialState = {
    employee: null,
    isLoading: false,
    error: null,
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_EMPLOYEE_REQUEST:
        case actionTypes.DELETE_EMPLOYEE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
        case actionTypes.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                employee: action.payload
            };
        case actionTypes.UPDATE_EMPLOYEE_FAILURE:
        case actionTypes.DELETE_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;

    }
}