import React from "react";
import '../styles/Nav.css'
import { StyledLink } from "../styles/styles";
import homeimg from '../icons/home.svg'
import flagimg from '../icons/flag2.svg'
import activityimg from '../icons/activityimg.svg'
import aboutimg from '../icons/about.svg'



const Navegacion = () => {
    return (<div>
        <div className="NavDiv">
            <div className="Navstuff">
                <StyledLink  to='/'><div className='botonesDiv'><img src={homeimg} alt='Img not found'/><h3>Home</h3></div></StyledLink>
                <StyledLink  to='/paises'><div className='botonesDiv'><img src={flagimg} alt='Img not found'/><h3>Paises</h3></div></StyledLink>
                <StyledLink  to='/createactivity'><div className='botonesDiv'><img src={activityimg} alt='Img not found'/><h3>Crear actividad</h3></div></StyledLink>
                <StyledLink  to='/Aboutme'><div className='botonesDiv'><img src={aboutimg} alt='Img not found'/><h3>Acerca de mi</h3></div></StyledLink>
            </div>
        </div>
    </div>)
}

export default Navegacion