import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";

import { productReducers} from "./components/reducers/productReducers";

const reducer = combineReducers({
    products: productReducers
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;