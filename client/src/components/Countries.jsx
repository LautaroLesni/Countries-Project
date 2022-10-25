import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Countries.css';
import CountryCard from './CountryCard';
import Paginado from './Paginado'
import SearchBar from './SearchBar';
import { getCountries, filterCountriesByContinent, filterCountriesByActivity, foundOrNotFoundAction, orderByStuff, refresh } from '../redux/actions';
import notfoundimg from '../icons/404-error.png'
import refreshimg from '../icons/refresh.png'

const Paises = () => {
    // CON ESTOS USE SELECTOR TRAEMOS LOS ESTADOS DE REDUX
    const paises = useSelector(state => state.paises) // PAISES PARA HACER EL RENDERIZADO
    const paisesfiltrar = useSelector(state => state.paisesReferencia) // MISMOS PAISES QUE ARRIBA, PERO PARA TOMAR DE REFERENCIA
    const foundOrNotFound = useSelector(state => state.foundOrNotFound)

    /*                    ORDENAMIENTO                                  */
    const [orden, setOrden] = useState('')

    /*                    PAGINADO                                  */
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCharacterPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = paises.slice(indexOfFirstCountry, indexOfLastCountry)

    const dispatch = useDispatch()
    /*EN CASO DE QUE LOS PAISES NO SE ENCUENTREN CARGADOS POR ALGUNA RAZÓN SE VA A EJECUTAR EL USEFFECT */
    useEffect(() => {
        dispatch(foundOrNotFoundAction(true))
  
        if (paises.length === 0 && foundOrNotFound !== false){
            dispatch(getCountries())
        
        }
        dispatch(refresh())
    },[])


     useEffect(() => {
        if (currentPage > Math.ceil(paises.length / countriesPerPage)) {
            setCurrentPage(1)
        }
        /*
        if (currentPage === 1){
            setCharacterPerPage(9)
        }
        else{
            setCharacterPerPage(10)
        }*/
    },[currentPage, countriesPerPage, paises.length]) 
    const paginado = (pags) => {
        setCurrentPage(pags)
    }
    const botonHandler = (e) => {
        if (e.target.name === 'Anterior' && currentPage !== 1) {
            setCurrentPage((prevState) => prevState - 1)
        }
        if (e.target.name === 'Siguiente' && currentPage !== Math.ceil(paises.length / countriesPerPage)) {
            setCurrentPage((prevState) => prevState + 1)
        }
    }

    const selectorContinentHandler = (e) => {
        dispatch(filterCountriesByContinent(e.target.value))

    }

    const selectorActivityHandler = (e) => {
        dispatch(filterCountriesByActivity(e.target.value))
    }

    const selectorOrderHandler = (e) => {
        dispatch(orderByStuff(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

    const refreshHandler = () => {
        dispatch(refresh())
    }

    /*                                      ACTIVIDADES DEL SELECTOR FILTRADAS                                                      */

    const paisesactividades = paisesfiltrar.filter(countries => countries.activities !== null) // Se filtran los paises aquellos que contengan actividades
    const activities = [] // Actividades sin filtrar
    paisesactividades.map(async (paises) => await paises.activities.map(acts => activities.push(acts.Nombre))) // Se colocan los nombres de las actividades de los paises dentro de un array aún sin filtrar (Osea que puede tener varias actividades con un mismo nombre)
    const activitiesfiltered = [] // Actividades filtradas el cual va a ser mapeado en el select (Final)
    activities.sort() // Se ordenan las actividades para que el for pueda comparar una tras otra ordenadamente

    // CICLO FOR PARA FILTRAR ACTIVIDADES CON EL MISMO NOMBRE, PARA QUE APAREZCAN UNA VEZ
    for (let i = 0; i < activities.length; i++) {
        if (activities[i] !== activities[i + 1]) {
            activitiesfiltered.push(activities[i])
        }
    }

    return (

        <div>
            <div className='CountriesGeneralDIV' >
                <h1>Paises del mundo</h1>
            </div>

            <div className='CountriesYPaginado'>

                <div className='SelectoresOuter'>
                    <div className='CountriesSelectoresDIV'>
                        <div className='SelectorDIV'>
                            <h3>Continentes</h3>
                            <select className='CountriesSelectores' onChange={selectorContinentHandler} defaultValue='All' name="Continente">
                                <option value="All">Todos</option>
                                <option value="South America">Sudamerica</option>
                                <option value="North America">Norteamerica</option>
                                <option value="Europe">Europa</option>
                                <option value="Oceania">Oceania</option>
                                <option value="Africa">Africa</option>
                                <option value="Asia">Asia</option>
                                <option value="Antarctica">Antarctica</option>
                            </select>
                        </div>
                        <div className='SelectorDIV'>
                        <h3>Actividades</h3>
                        <select className='CountriesSelectores' onChange={selectorActivityHandler} name="Actividad">
                            <option value='All'>Ninguna</option>
                            {activitiesfiltered && activitiesfiltered.map(acts => (
                                <option key={acts} value={acts}>{acts}</option>
                            ))}
                        </select>
                        </div>
                                <div className='SelectorDIV'>
                                <h3>Ordenamiento</h3>
                        <select onChange={selectorOrderHandler} className='CountriesSelectores' name='OrdenAlf'>
                            <option value='Desordenado'> Original</option>
                            <option value='Ascendente'> A - Z</option>
                            <option value='Descendente'>Z - A</option>
                            <option value='Leastpopulation'>Menor poblacion</option>
                            <option value='Mostpopulation'>Mayor poblacion</option>
                        </select>
                        </div>
                        <div className='SelectorDIV'>
                            <h3>Refrescar</h3>
                            <button onClick={refreshHandler}><img src={refreshimg}/></button>
                        </div>

                        <SearchBar />
                    </div>
                </div>

                <div className='PaginadoArriba'>
                    <Paginado
                        paginado={paginado}
                        countriesPerPage={countriesPerPage}
                        paises={paises}
                        currentPage={currentPage} />

                    <div className='BotonPaginadoDIV'>
                        <button className='BotonPaginado' name='Anterior' onClick={botonHandler}>Anterior</button>
                        <button className='BotonPaginado' name='Siguiente' onClick={botonHandler}>Siguiente</button>
                    </div>
                </div>

                {paises.length === 0 ? <h3>Cargando...</h3> : foundOrNotFound === true ? <div className='Countrieslist'>
                    {currentCountries && currentCountries.map(pais => (
                        <CountryCard
                            key={pais.ID}
                            img={pais.img}
                            name={pais.name}
                            continente={pais.Continente}
                            id={pais.ID}
                        />))}
                </div> : <div className='NoEncontrado'><img src={notfoundimg} alt='Img not found'/><h3>No se encontraron paises con esos parametros</h3></div>}

                <div className='PaginadoAbajo'>
                    <div className='BotonPaginadoDIV'>
                        <button className='BotonPaginado' name='Anterior' onClick={botonHandler}>Anterior</button>
                        <button className='BotonPaginado' name='Siguiente' onClick={botonHandler}>Siguiente</button>
                    </div>
                    <Paginado
                        paginado={paginado}
                        countriesPerPage={countriesPerPage}
                        paises={paises}
                        currentPage={currentPage} />
                </div>
            </div>
        </div>
    )
}

export default Paises