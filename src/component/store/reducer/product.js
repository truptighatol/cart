import * as types from "../action/types";

const initialState = {
    fetchExchangeRateResponse: null
};

const ProductReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case types.GET_EXCHANGE_RATE:
            newState = {
                ...state,
                fetchExchangeRateResponse: action.payload
            }
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};

export default ProductReducer;