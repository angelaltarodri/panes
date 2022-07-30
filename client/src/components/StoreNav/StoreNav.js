import React from 'react'
import{useHistory} from "react-router-dom";
import "./StoreNav.css"
import logo from '../Images/logo_400x400.png'
export default function StoreNav() {
    const history = useHistory()    
    const gohome = () => history.push("/")
    return (    
        <div className="StoreNav_container">
            <div className="StoreNav">
                <div onClick={gohome}>
                    <img src={logo} alt="logo" className="StoreNav_logo" />
                </div>
                <div className="StoreNav_titles">
                    <div>USUARIO</div> 
                    <div>CARRITO</div>
                </div>
            </div>
        </div>

    )
}
