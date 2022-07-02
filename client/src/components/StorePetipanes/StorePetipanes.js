import React, { useEffect, useState } from 'react'
import{useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'

export default function StorePetipanes() {

  const pedidos = useSelector(store => store.orderReducer.petipanes)  
  const items = useSelector(store => store.itemsReducer.items)  
  const dispatch = useDispatch()
  const addToCart = (e) => {
    let value = e.target.getAttribute("value")
    if(pedidos[0][value]){
      pedidos[0][value] += 5
    } else {
      pedidos[0][value] = 5
    }
    dispatch({type:'ORDER_PETIPANES', payload: pedidos})
  }

  const itemsPlusFive = items.map(item=> {
    return <div className="StorePetipanes_opciones" onClick={addToCart} value={item.itemCode}>+ 5 {item.itemName}</div>
  })

  const itemsOnOrder = items.map(item => {
    const deleteItem = () => {
      console.log(item.itemCode)
      pedidos[0][item.itemCode] = 0
      dispatch({type:'ORDER_PETIPANES', payload: pedidos})
    }

    if(pedidos[0][item.itemCode]){
      return <div className="StorePetipanes_cantidad">
        <div className="StorePetipanes_cantidad_izq"> {item.itemName} tiene {pedidos[0][item.itemCode]} </div>
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
      <div className="StorePetipanes_pedir">
        <div className="StorePetipanes_backButton" onClick={gohome}>Back</div>
        <div className="StorePetipanes_selector">
          {itemsPlusFive}
        </div>
      </div>
      <div className="StorePetipanes_botones">
        {itemsOnOrder}
      </div>
      <PetipanSimulator pedido={pedidos[0]}/>
    </div>
  )
}
