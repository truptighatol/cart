import * as types from "../action/types";

import axios from 'axios';

//@Todo apikey configuration
export const getCurrencyExchangeRate = () => dispatch => {
    let data;
    axios({
        'method':'GET',
        'url':' https://v6.exchangerate-api.com/v6/c585f02042e84f0b3b361808/latest/USD' 
    }).then((response)=>{
       data = response.data
        console.log(response);
    })
    .catch((error) => {
        console.log(error)
    });

    dispatch({
        type: types.GET_EXCHANGE_RATE,
        payload: data
    });
};