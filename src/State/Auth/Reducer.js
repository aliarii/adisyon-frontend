import * as actionTypes from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    success: null,
    isValidated: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
        case actionTypes.REGISTER_EMPLOYEE_REQUEST:
        case actionTypes.LOGIN_REQUEST:
        case actionTypes.GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case actionTypes.VALIDATE_TOKEN_REQUEST:
            return { ...state, isLoading: true, error: null, success: null, isValidated: false };

        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.REGISTER_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Register Success",
                error: null,
            };
        case actionTypes.VALIDATE_TOKEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isValidated: action.payload,
                error: null,

            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Login Success",
                error: null,
            };

        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case actionTypes.REGISTER_FAILURE:
        case actionTypes.REGISTER_EMPLOYEE_FAILURE:
        case actionTypes.LOGIN_FAILURE:
        case actionTypes.GET_USER_FAILURE:
        case actionTypes.VALIDATE_TOKEN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;

    }
}