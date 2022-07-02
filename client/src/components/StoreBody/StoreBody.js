import React from 'react'
import "./StoreBody.css"
import{useHistory} from "react-router-dom";

export default function StoreBody() {

    const history = useHistory()

    const gopetipanes = () => {
        history.push("/tienda/petipanes")
    }

    return (
        <div>
            <div className="StoreBody_cuadro" onClick={gopetipanes}>
                PETIPANES
            </div>
            <div className="StoreBody_cuadro">
                CIABATTA
            </div>
        </div>
    )
}
