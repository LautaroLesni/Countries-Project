import React, { useEffect } from 'react';
import Nav from './Nav'
import { getCountriesByID } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/SpecificCountry.css'
import { Link } from 'react-router-dom';
import subregionimg from '../icons/subregion.png'
import capitalimg from '../icons/capital.png'
import populationimg from '../icons/populatio.png'
import surfaceimg from '../icons/superficie.png'
const SpecificCountry = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountriesByID(id))

    }, [id, dispatch])
    const { pais } = useSelector(state => state)
    console.log(pais)


    return (

        <div>
            <Nav></Nav>
            <div className='SpecificCardDIV'>
                <div className='ConoceTuPaisDIV'>
                    <h3>Conoce el país a profundidad</h3>
                </div>
                <div className='SeparardorSpecificCountry'>

                </div>
                <div className='SpecificCountryCard'>
                    <div className='PrimerSeparador'>
                        <img src={pais.imgbig} alt={pais.name} />
                        <div className='SegundoSeparador'>
                            <div className='SubSeparador'>
                                <div className='SubSeparadorInside'>
                                    <div className='TitleAndImgDIV'>
                                        <img src={subregionimg} alt='Img not found'/>
                                    <h3>Subregion</h3>
                                    </div>
                                    <h4>{pais.Subregion}</h4>
                                </div>
                                <div className='SubSeparadorInside'>
                                <div className='TitleAndImgDIV'>
                                <img src={capitalimg} alt='Img not found'/>
                                    <h3>Capital</h3>
                                    </div>
                                    <h4>{pais.Capital ? pais.Capital : "Sin capital"}</h4>
                                </div> 
                            </div>
                            <div className='SubSeparador'>
                                <div className='SubSeparadorInside'>
                                <div className='TitleAndImgDIV'>
                                <img src={populationimg} alt='Img not found'/>
                                    <h3>Poblacion</h3>
                                    </div>
                                    <h4>{`${pais.Poblacion} habitantes`}</h4>
                                </div>
                                <div className='SubSeparadorInside'>
                                <div className='TitleAndImgDIV'>
                                <img src={surfaceimg} alt='Img not found'/>
                                    <h3>Superficie</h3>
                                    </div>
                                    <h4>{`${pais.Area} km2`}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>{pais.name}</h2>
                    <h2>{pais.Continente}</h2>
                    <Link to={`/createactivity/${pais.ID}`}><button>Crear actividad</button></Link>
                </div>
                <h1 className='Actividadesheader'>Actividades</h1>
                <div className='ActividadesDIV'>

                    {pais.activities && pais.activities.length > 0 ? pais.activities.map(acts => (
                        <div className='ActividadesCard'>
                            <h2>{`${acts.Nombre}`}</h2>
                            <div className='ActivitiesHalfDIV'>   
                            <div className='InnerActivitieDIV'>                                                            
                            <h2>Dificultad</h2>
                            <h3>{`${acts.Dificultad}/5`}</h3>   
                            </div>  
                            <div className='InnerActivitieDIV'>                       
                            <h2>Duracion</h2>
                            <h3>{`${acts.Duracion} horas`}</h3> 
                            </div>  
                            <div className='InnerActivitieDIV'>                            
                            <h2>Temporada</h2>
                            <h3>{acts.Temporada}</h3>
                            </div>
                            </div>                       
                        </div>
                    )) : <h1 className='NoActivities'>No se han creado actividades para este país aún</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default SpecificCountry