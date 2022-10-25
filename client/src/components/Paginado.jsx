import React from "react";
import '../styles/Paginado.css'


const Paginado = ({paginado, countriesPerPage, paises, currentPage}) => {
    const paginas = []
    for (let i = 0; i < Math.ceil(paises.length/countriesPerPage); i++) {
        paginas.push(i+1)       
    }

    return (
        <nav>
            <ul className="paginado">
                {paginas && paginas.map(pags => (
                    <li key={pags}>
                        <button className={currentPage === pags ? 'BotonElegido' : "BotonPaginado"} onClick={()=>paginado(pags)}>{pags}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginado