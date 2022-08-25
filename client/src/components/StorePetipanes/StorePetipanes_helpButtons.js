import React from 'react'
import{useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
export default function StorePetipanes_helpButtons({cant}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const gohome = () => navigate("/")    
    const paquetes = useSelector(store => store.itemsReducer.petipanesPaquetes)  
    const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 
    const addCajaPetipanes = (amount) => {
        const ncant = Number(cant) + amount
        const nuevoprecio = () => {
            if(ncant > 100){
                return petipanesMonto + 35
            } else if(ncant == 0){
                return petipanesMonto
            } else {
                return paquetes.find(paquete => paquete.paqueteNumero == ncant).paquetePrecio
            }
        }
        dispatch({type:'AMOUNT_PETIPANES', payload: nuevoprecio()})
        dispatch({type:'ERASE_ORDER'})
        navigate(`/petipanes/${ ncant == 0 ? "25" : ncant }`)
    }
    return (
        <div className="StorePetipanes_helpButtons">
            <div onClick={gohome}>Volver</div> 
            <div>
                <div>
                <div className="StorePetipanes_">
                    {cant/25} {cant/25 == 1 ? "caja" : "cajas"}
                </div>
                <div className="StorePetipanes_" onClick={()=>addCajaPetipanes(-25)}>
                    -
                </div>
                <div className="StorePetipanes_" onClick={()=>addCajaPetipanes(25)}>
                    +
                </div>
                </div>
                <div>
                TOTAL: {cant} PETIPANES
                </div>
            </div>
        </div>
    )
}
