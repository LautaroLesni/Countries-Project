import React from 'react';
import '../styles/SearchBar.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesByName } from '../redux/actions';
import { useEffect } from 'react';

const SearchBar = () => {
    
    const dispatch = useDispatch();
    const paises = useSelector(state => state.paisesReferencia)

    const initialState = {
        pais:""
    }
    const [input, setInput] = useState(initialState);
    const [inputError, setInputError] = useState({})
    const [encontrado, setEncontrado] = useState({encontrado: true})
    useEffect(()=>{
        setInputError(Validate(input))
    },[dispatch])

    useEffect(()=>{
    setEncontrado({encontrado: true})
    },[])

    useEffect(()=>{
        if (encontrado.encontrado === true){
        setInputError({})
        }
    },[dispatch])


    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const preventDefault = (e) => {
        e.preventDefault();
        dispatch(getCountriesByName(input.pais))
        setInputError(Validate(input))
    }

    const Validate = (value) =>{
        let paisencontrado = paises.filter(paises=> paises.name.toLowerCase().includes(value.pais.toLowerCase()))
        let errors = {}
        if (paisencontrado.length === 0){
            errors.paises = 'No se encontraron paises con ese nombre'
            setEncontrado({encontrado: false})
        }
        else {setEncontrado({encontrado: true})}
        return errors
    }
    return (

    <div>
        <form>
        <label htmlFor="pais"></label>
        <input className={encontrado.encontrado === true ? 'SearchBar' : 'SearchNotFound'} name='pais' value={input.pais} onChange={handleChange} type="text" placeholder='Buscar país...'></input>
        <button type='submit' onClick={preventDefault} className='Searchbutton'>Buscar</button>
        </form>
    </div>)
}

export default SearchBar