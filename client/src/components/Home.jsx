import React from "react";
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../redux/actions";


const Home = () => {

    const paises = useSelector(state => state.paises)
    const dispatch = useDispatch()
    useEffect(() => {
        if (paises.length === 0) {
            dispatch(getCountries())
        }
    },[])
    return (
        <div className="HomeFondo">
            <h1 className="Homeheader">Paises del mundo</h1>
            <Link to="/paises"> <button className="Homebutton">Iniciar</button></Link>
        </div>
    )
}

export default Home