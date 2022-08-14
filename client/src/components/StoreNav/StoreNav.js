import React from 'react'
import{useHistory} from "react-router-dom";
import "./StoreNav.css"
import logo from '../Images/logo_400x400.png'
export default function StoreNav() {
    const history = useHistory()    
    const gohome = () => history.push("/")
    const goUser = () => history.push("/tienda/login")
    
    return (    
        <div className="StoreNav_container">
            <div className="StoreNav">
                <div onClick={gohome}>
                    <img src={logo} alt="logo" className="StoreNav_logo" />
                </div>
                <div className="StoreNav_titles">
                    <div onClick={goUser}>USUARIO</div> 
                    <div>CARRITO</div>
                </div>
            </div>
        </div>

    )
}
