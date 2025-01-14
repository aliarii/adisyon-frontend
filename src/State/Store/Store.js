import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";
import { authReducer } from "../Auth/Reducer";
import { orderReducer } from "../Order/Reducer";
import { companyReducer } from "../Company/Reducer";
import { cartReducer } from "../Cart/Reducer";
import { basketReducer } from "../Basket/Reducer";
import { productCategoryReducer } from "../ProductCategory/Reducer";
import { productReducer } from "../Product/Reducer";
import { employeeReducer } from "../Employee/Reducer";
import { reportReducer } from "../Report/Reducer";
import { basketCategoryReducer } from "../BasketCategory/Reducer";
import { receiptReducer } from "../Receipt/Reducer";
import { recordReducer } from "../RecordItem/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    basket: basketReducer,
    basketCategory: basketCategoryReducer,
    cart: cartReducer,
    order: orderReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    employee: employeeReducer,
    report: reportReducer,
    receipt: receiptReducer,
    record: recordReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));