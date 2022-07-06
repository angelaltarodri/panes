import React from 'react'
import{useHistory} from "react-router-dom";
import "./StoreNav.css"
import logo from '../Images/logo_400x400.png'
export default function StoreNav() {
    const history = useHistory()    
    const gohome = () => history.push("/")
    return (    
        <div className="StoreNav">
            <div onClick={gohome}>
                <img src={logo} alt="logo" className="StoreNav_logo" />
            </div>
            <div>
                <div>USUARIO</div> 
                <div>CARRITO</div>
            </div>
        </div>

    )
}
