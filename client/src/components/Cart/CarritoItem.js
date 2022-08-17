import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react'
import './Cart.css'
export default function CarritoItem({pedido, index}) {
    const dispatch = useDispatch()
    const sabores = useSelector(store => store.itemsReducer.petipanesSabores) 
    const items = useSelector(store => store.cartReducer.items) 
    const [showdetails, setshowdetails] = useState('none')
    const pedidoValues = Object.values(pedido.items)
    const cant = () => {
        let cant = 0
        for (let i = 0; i < pedidoValues.length; i++) {
            cant += pedidoValues[i]
        }
        return cant
    }
    const pedidoKeys = Object.keys(pedido.items)
    const detallesPedido = pedidoKeys.map(item => {
        const sabor = sabores.find(sabor => sabor.itemCode == item)
        return <div className="Cart_detalles" key={item}>
            <div className="Cart_ultraizq_detalle">
            
            </div>
            <div className="Cart_izq_detalle">
            {pedido.items[item]}
            </div>
            <div className="Cart_med_detalle"> 
            {sabor.itemShortName}
            </div> 
            <div className="Cart_ultrader_detalle">
            </div>
        </div>
    })
    const viewDetails = (e) => {
        showdetails=='none' ? setshowdetails('flex') : setshowdetails('none')
        if (e.target.innerHTML === '+'){
            e.target.innerHTML = '-'
        } else {
            e.target.innerHTML = '+'
        }
    }
    const deletePedido = () => {
        dispatch({type:'DELETE_PEDIDO', payload:index})
    }
  
    return <div className="Cart_carrito">
        <div className="Cart_carrito_fila">
            <div className="Cart_ultraizq" onClick={viewDetails}>
            +
            </div>
            <div className="Cart_izq">
            {index+1}
            </div>
            <div className="Cart_med"> 
            {cant()} {pedido.asunto}
            </div> 
            <div className="Cart_der">
            {pedido.monto}
            </div>
            <div className="Cart_ultrader"  onClick={deletePedido}>
            x
            </div>
        </div>
        <div style={{display:showdetails}}  className="Cart_carrito_fila_detalles">
            {detallesPedido}
        </div>
    </div>
}
