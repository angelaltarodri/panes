import React, { useState } from 'react'
import "./StoreBody.css"
import{useHistory, Link} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function StoreBody() {

    const history = useHistory()
    const [mostraropciones, setmostraropciones] = useState('none')
    const paquetes = useSelector(store => store.itemsReducer.petipanesPaquetes)  
    console.log(paquetes)

    const linksToPaquetes = paquetes.map(paq => {
        return <Link to={`/tienda/petipanes/${paq.paqueteNumero}`}>
            <div className="StoreBody_petipanes-opciones">
                {paq.paqueteNumero} petipanes
            </div>
        </Link>
    })

    const selectopciones = () => mostraropciones == "none" ? setmostraropciones('block') : setmostraropciones('none')
    return (
        <div>
            <div className="StoreBody_cuadro" onClick={selectopciones} >
                PETIPANES
            </div>
            <div style={{display: mostraropciones}}>
                {linksToPaquetes}
            </div>
            <div className="StoreBody_cuadro">
                CIABATTA
            </div>
        </div>
    )
}
