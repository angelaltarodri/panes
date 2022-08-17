import React from 'react'
import{useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StoreNav.css"
import logo from '../Images/logo_400x400.png'
import {sumaMontos} from '../Cart/SumaMontos'
export default function StoreNav() {
    const carrito = useSelector(store => store.cartReducer.carrito) 
    const history = useHistory()    
    const gohome = () => history.push("/")
    const goUser = () => history.push("/tienda/login")
    const goCart = () => history.push("/tienda/carrito")
    const sumaMonto = sumaMontos()
    return (    
        <div className="StoreNav_container">
            <div className="StoreNav">
                <div onClick={gohome}>
                    <img src={logo} alt="logo" className="StoreNav_logo" />
                </div>
                <div className="StoreNav_titles">
                    <div onClick={goUser}>USUARIO</div> 
                    <div onClick={goCart}>
                        <div>CARRITO</div>
                        {
                        carrito.length != 0 ?
                        <div className="StoreNav_monto" >{sumaMonto}</div>
                        : null
                    }
                    </div>
                </div>
            </div>
        </div>

    )
}
