import '../styles/CountryCard.css'
import React from 'react'
import { Link } from 'react-router-dom'

const CountryCard = ({img, name, continente, id}) => {
    return (
    <div className="CountryCard">
  <Link to={`/country/${id}`}><div className='CountryCardImgDIV'> <img className='CountryCardImg' src={img} alt={name}></img></div></Link> 
    <h2>{name}</h2>
    <h3>{continente}</h3>      
    </div>)
}

export default CountryCard