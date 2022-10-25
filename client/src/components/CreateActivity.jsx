import '../styles/CreateActivity.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Nav from './Nav'
import axios from 'axios';
import { getCountries } from '../redux/actions';

const CreateActivity = () => {
    const initialState = {
        nombre: '',
        dificultad: '3',
        duracion: '',
        temporada: 'Verano',
        pais: '',
        paises: []
    }

    const [input, setInput] = useState(initialState)
    const [inputErrors, setInputErrors] = useState({})
    const [creado, setCreado] = useState({creado:false})
    const [isEnable, setIsEnable] = useState(true)

    const countries = useSelector(state => state.paisesReferencia)
    const dispatch = useDispatch()


    useEffect(()=> {

        if (countries.length === 0){
            dispatch(getCountries())
        }
        else {console.log('Los paises ya estaban cargados')}
    })

    useEffect(()=> {
        setInputErrors(Validate(input))
        
    },[input])

    useEffect(()=> {
        setInputErrors({})
        
    },[creado])

 
    const handlerChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setInputErrors(Validate(input))
    }

    const paiseselegidos = [...input.paises, input.pais]
    const paisForm = input.paises.find(pais => pais === input.pais)
    const CountryHandler = (e) => {
        e.preventDefault()
        if (!paisForm){
        if (input.paises.length < 12){
        setInput((prevState) => ({
            ...prevState,
            paises: paiseselegidos
        }))}}
    }

    const DeleteCountry = (e) => {
        e.preventDefault()
        setInput((prevState) => ({
            ...prevState, paises: input.paises.filter(pais => pais !== e.target.name)
        }))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (Object.keys(inputErrors).length === 0 && input.nombre){        
        let actividad = { ...input, [input.dificultad]: parseInt(input.dificultad) }
        axios.post('http://localhost:3001/activities/', actividad)
            .then(res => console.log('Creado exitosamente', res.data))
            setCreado({creado:true})
            setInput((prevState)=> ({...prevState, nombre:'', duracion:'', paises:[]}))
            setIsEnable(false)
        }
        else{setCreado({creado:false})}
    }

    const Validate = (values) => {
        const regexnombre = /^[a-zA-\s]+(?: [a-zA-\s]+)*$/i
        const regexduracion = /^[0-9]+$/
        let errors = {}
        let paisesConTalActividad = []
        let repetido = []
        for (let i = 0; i < countries.length; i++) {
            countries[i].activities.map(acts => acts.Nombre.toLowerCase() === values.nombre.toLowerCase() && paisesConTalActividad.push(countries[i]))
        }
        if (paisesConTalActividad.length > 0) {
        for (let i = 0; i < paisesConTalActividad.length; i++) {
            for (let j = 0; j < values.paises.length; j++) {
                paisesConTalActividad[i].ID === values.paises[j] && repetido.push(paisesConTalActividad[i])
            }
            
        }
    }

        if (!values.nombre) {
            errors.nombre = 'Debes asignar un nombre a la actividad'
        }
        else if (values.nombre.length < 3) {
            errors.nombre = 'La actividad debe tener al menos 3 caracteres'
        }
        else if (!regexnombre.test(values.nombre)) {
            errors.nombre = 'La actividad debe contener solo letras'
        }
        else if (values.nombre.length > 14) {
            errors.nombre = 'La actividad puede contener 15 caracteres maximo'
        }
        if (!values.duracion){
        errors.duracion = 'Si no especificas las horas, la duración será relativa'}
        else if(!regexduracion.test(values.duracion)){
            errors.duracion = 'La cantidad de horas deben ser numericas'
        }

        if (values.paises.length === 0){
            errors.paises = 'Debes agregar al menos un país utilizando el botón'
        }
        else if (repetido.length > 0){
            errors.paises ='No puedes agregar dos veces una actividad al mismo país'
        }

        return errors
    }



    return (<div>
        <Nav></Nav>
        <div className='FormPageDIV'>
            <div className='CreateActivityDIV'>
        <h3>Crea tu Actividad</h3>
            </div>
            <div className='ActivitySeparator'>
            <span>{' '}</span>
            </div>
            <div className='FormularioDIV'>
                <div className='Formulario'>
                    <form>
                <h1 className='Actividadheader'>Formulario</h1>

                    <div className='FormInRow'>
                        <div className='InputFormsDIV'>
                            <label>Nombre</label>
                            <input className={inputErrors.nombre ? 'InputNombreError' : 'InputForm'} type='text' onChange={handlerChange} name='nombre' value={input.nombre} placeholder='Nombre de la actividad...'></input>
                        </div>
                        <p className='InputErrorMessage'>{inputErrors.nombre}</p>

                        <div className='InputFormsDIV'>
                            <label>Duracion</label>
                            <div className='NormalButtonDIV'>
                                <input className={inputErrors.duracion ? 'InputNombreError' : 'InputForm'} type='text' onChange={handlerChange} name='duracion' value={input.duracion} placeholder='Duracion de la actividad...'></input>
                                <span className='horas'>hs</span>
                            </div>
                        </div>
                        </div>
                        <p className='InputErrorMessage'>{inputErrors.duracion}</p>


                        <div className='InputFormsDIV'>
                            <label>Dificultad</label>
                            <select defaultValue={3} className='InputForm' name='dificultad' onChange={handlerChange}>
                                <option value={1}>Muy Facil</option>
                                <option value={2}>Facil</option>
                                <option value={3}>Normal</option>
                                <option value={4}>Dificil</option>
                                <option value={5}>Muy Dificil</option>
                            </select>
                        </div>



                        <div className='InputFormsDIV'>
                            <label>Temporada</label>
                            <select defaultValue={'Verano'} className='InputForm' name='temporada' onChange={handlerChange}>
                                <option value='Verano'>Verano</option>
                                <option value='Otoño'>Otoño</option>
                                <option value='Invierno'>Invierno</option>
                                <option value='Primavera'>Primavera</option>
                            </select>
                        </div>

                        <div className='InputFormsDIV'>
                            <label>Paises</label>

                            <div className='NormalButtonDIV'>
                                <select className='InputForm' name='pais' onChange={handlerChange}>
                                    <option value='default'>Elegir pais</option>
                                    {countries.map(paises => (
                                        <option key={paises.ID} value={paises.ID}>{paises.name}</option>
                                    ))}
                                </select>
                                <button className='NormalButtonForm' onClick={CountryHandler}>+</button>
                            </div>
                                <p className='InputErrorMessage'>{inputErrors.paises}</p>

                        </div>
                        <div className='contenedorpaises'>
                            {input.paises.map(paises => (
                                <div key={paises} className='PaisContainer'>
                                    <button className='DeleteButton' name={paises} onClick={DeleteCountry}>X</button>
                                    <h3 className='PaisInside'>{`${paises}`}</h3>
                                </div>
                            ))}
                        </div>
                        <div className='SubmitButtonDIV'>
                        <button className='SubmitButton' disabled={Object.keys(inputErrors).length === 0 && isEnable === true ? false : true} onClick={SubmitHandler}>Crear Actividad</button>
                        <p className='FormCreado'>{creado.creado === true ? 'Actividad creada correctamente' : ''}</p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateActivity

/* axios.post('localhost:3000/activities',input) */