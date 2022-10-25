export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const FILTER_COUNTRIES_BY_CONTINENT = 'FILTER_COUNTRIES_BY_CONTINENT'
export const FILTER_COUNTRIES_BY_ACTIVITY = 'FILTER_COUNTRIES_BY_ACTIVITY'
export const FOUND_OR_NOT = 'FOUND_OR_NOT'
export const ORDER_BY_STUFF = 'ORDER_BY_STUFF'
export const REFRESH = 'REFRESH'

const axios = require('axios')

export const getCountries = () => dispatch => {
        return axios.get('http://localhost:3001/countries')
        .then(res => res.data)
        .then(res => {
            dispatch({
                type:GET_COUNTRIES,
                payload: res
            })
        })
    }
export const getCountriesByID =  (id) => dispatch => {
        return axios.get(`http://localhost:3001/countries/${id}`)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type:GET_COUNTRIES_BY_ID,
                payload: res
            })
        })
    }
export const getCountriesByName =  (name) => dispatch => {
        return axios.get(`http://localhost:3001/countries?nombre=${name}`)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type:GET_COUNTRIES_BY_NAME,
                payload: res
            })
        })
    }

    export const filterCountriesByContinent = (select) => {
        return {
            type: FILTER_COUNTRIES_BY_CONTINENT,
            payload: select
        }
    }

    export const filterCountriesByActivity = (select) => {
        return {
            type: FILTER_COUNTRIES_BY_ACTIVITY,
            payload: select
        }
    }

export const foundOrNotFoundAction = (option) => {
    return {
        type: FOUND_OR_NOT,
        payload: option
    }
}
export const orderByStuff = (option) => {
    return{
        type: ORDER_BY_STUFF,
        payload: option
    }
}

export const refresh = () => {
    return {
        type: REFRESH
    }
}