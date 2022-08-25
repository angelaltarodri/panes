import React from 'react'
import CarritoItem from './CarritoItem'
import {useDispatch, useSelector} from 'react-redux'
import {sumaMontos} from './SumaMontos'
export default function CartTabla() {
    const dispatch = useDispatch()
    const carrito = useSelector(store => store.cartReducer.carrito) 
    const carritoMap = carrito.map((pedido, index) => {
        return <CarritoItem pedido={pedido} index={index} key={index}/>
      })
    return (
        <div className="Cart_tabla">
            <div className="Cart_carrito_header">
                <div className="Cart_ultraizq"></div>
                <div className="Cart_izq">
                    Nro
                </div>
                <div className="Cart_med"> 
                    Motivo
                </div> 
                <div className="Cart_der">
                    Monto
                </div>
                <div className="Cart_ultrader">
                </div>
            </div>
            {carrito.length != 0 ? 
            <div className="Cart_carrito">
            {carritoMap}
            </div>
            : 
            <div className="Cart_carrito_fila_vacia">
                <div>
                    Todavía no tiene pedidos alistados en el carrito.
                </div>
            </div>
            }
            <div className="Cart_carrito_footer">
                <div className="Cart_ultraizq">

                </div>
                <div className="Cart_izq">
                    
                </div>
                <div className="Cart_med"> 
                    Monto total
                </div> 
                <div className="Cart_der">
                    {`${sumaMontos()}`}
                </div>
                <div className="Cart_ultrader"></div>
            </div>
        </div>
    )
}
