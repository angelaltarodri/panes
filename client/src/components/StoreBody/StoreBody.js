import React, { useState } from 'react'
import "./StoreBody.css"
import{useHistory, Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

export default function StoreBody() {
    const dispatch = useDispatch()
    const [mostraropciones, setmostraropciones] = useState('none')
    const paquetes = useSelector(store => store.itemsReducer.petipanesPaquetes)  
    const linksToPaquetes = paquetes.map((paq, index) => {
        const changeAmount = () => {
            dispatch({type:'AMOUNT_PETIPANES', payload: paq.paquetePrecio})
            dispatch({type:'ERASE_ORDER'})
        }
        return <Link to={`/petipanes/${paq.paqueteNumero}`} onClick={changeAmount} key={index}>
            <div className="StoreBody_petipanes_opciones">
                {paq.paqueteNumero} petipanes a S/ {paq.paquetePrecio}
            </div>
        </Link>
    })

    const selectopciones = () => mostraropciones == "none" ? setmostraropciones('block') : setmostraropciones('none')
    return (
        <div className="StoreBody">
            <div className="StoreBody_cuadro_petipanes" onClick={selectopciones} ></div>
            <div className="StoreBody_titulo" onClick={selectopciones}>PETIPANES</div>
            <div style={{display: mostraropciones}} className="StoreBody_petipanes_preopciones">
                {linksToPaquetes}
                <div className="StoreBody_petipanes_detalledelivery">Los precios incluyen delivery.</div>
            </div>
            <div className="StoreBody_cuadro_ciabatta"></div>
            <div className="StoreBody_titulo">CIABATTA</div>
        </div>
    )
}
