import React, { useEffect, useState } from 'react'
import{useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'

export default function StorePetipanes() {

  const pedidos = useSelector(store => store.orderReducer.petipanes)  
  const items = useSelector(store => store.itemsReducer.items)  
  const dispatch = useDispatch()
  const addToCart = (value) => {
    if(pedidos[0][value]){
      pedidos[0][value] += 5
    } else {
      pedidos[0][value] = 5
    }
    dispatch({type:'ORDER_PETIPANES', payload: pedidos})
  }

  const itemsPlusFive = items.map(item=> {
    return <div className="StorePetipanes_opciones" onClick={()=>addToCart(item.itemCode)} style={{backgroundColor:item.itemBackgroundColor, color:item.itemTextColor}}>
      <div>
        <div> + 5 </div>
        <div> {item.itemShortName} </div>
      </div>
    </div>
  })

  const itemsOnOrder = items.map(item => {
    const deleteItem = () => {
      delete(pedidos[0][item.itemCode])
      dispatch({type:'ORDER_PETIPANES', payload: pedidos})
    }

    if(pedidos[0][item.itemCode]){
      return <div className="StorePetipanes_cantidad">
        <div className="StorePetipanes_cantidad_izq"> {pedidos[0][item.itemCode]}</div>
        <div className="StorePetipanes_cantidad_mid">{item.itemShortName}</div>
        <div className="StorePetipanes_cantidad_der" onClick={deleteItem}> x </div>
        </div>
    } else {
      return null
    }
  })

  const history = useHistory()  
  const gohome = () => history.push("/tienda")

  return (
    <div>
      <div className="StorePetipanes_botones">
        <div className="StorePetipanes_backButton" onClick={gohome}>Volver</div>
        Agregar:
        <div className="StorePetipanes_selector">
          {itemsPlusFive}
        </div>
        <div className="StorePetipanes_cantidades">
          En tu pedido hay: 
          {itemsOnOrder}
        </div>
      </div>
      Tu caja quedaría así:
      <PetipanSimulator pedido={pedidos[0]}/>
    </div>
  )
}
