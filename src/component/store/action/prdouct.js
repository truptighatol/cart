import * as types from "../action/types";
import axios from 'axios';

//@Todo use configuration for apikey
export const getCurrencyExchangeRate = () => dispatch => {
    axios({
        'method':'GET',
        'url':' https://v6.exchangerate-api.com/v6/c585f02042e84f0b3b361808/latest/INR'
    }).then((response)=>{
       dispatch({
        type: types.GET_EXCHANGE_RATE,
        payload: response.data.conversion_rates
    });
    })
    .catch((error) => {
        console.log(error)
    });
};