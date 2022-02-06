import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productReducer from "../store/reducer/product";

const initialState = {};

// used to dispact combined response for multiple dispatch
// can apply multiple middleware for different environment
const middleware = [thunk];

//__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is tool to check the state of store while debugging the application in development environment
// const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose || compose;
const composeEnhancers = compose;

const store = createStore(
    productReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;