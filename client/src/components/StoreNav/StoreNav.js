import React from 'react'
import{useHistory} from "react-router-dom";
export default function StoreNav() {
    const history = useHistory()    
    const gohome = () => history.push("/")
    return (    
        <div className="StoreNav">
            <div onClick={gohome}>EL CHICO DE LOS PANES</div>
            <div>USUARIO</div>
            <div>CARRITO</div>
        </div>

    )
}
