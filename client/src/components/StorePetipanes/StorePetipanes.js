import React, { useEffect, useState } from 'react'
import{useHistory, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'

export default function StorePetipanes() {
  const dispatch = useDispatch()
  const history = useHistory()  
  const {cant} = useParams()
  const sabores = useSelector(store => store.itemsReducer.petipanesSabores)  
  const paquetes = useSelector(store => store.itemsReducer.petipanesPaquetes)  
  const paqueteElegido = paquetes.find(paquete => paquete.paqueteNumero == cant)
  const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
  const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 

  const gohome = () => history.push("/tienda")
  const nOfItems = Object.keys(petipanesOrden[0])

  const itemsPlusFive = sabores.map(item=> {

    const addToCart = () => {
      petipanesOrden[0][item.itemCode] ? petipanesOrden[0][item.itemCode] += 5 : petipanesOrden[0][item.itemCode] = 5
      let saborsito = sabores.find(sabor => sabor.itemCode == item.itemCode)
      dispatch({type:'AMOUNT_PETIPANES', payload: petipanesMonto + saborsito.itemPriceChange})
      dispatch({type:'ORDER_PETIPANES', payload: petipanesOrden})
    }
    if(!item.itemType.includes("adicional"))
    return <div className="StorePetipanes_opciones" onClick={addToCart} style={{backgroundColor:item.itemBackgroundColor, color:item.itemTextColor}}>
      <div>
        <div> + 5 </div>
        <div> 
          {item.itemShortName} 
        </div>
      </div>
    </div>
  })

  const itemsOnOrder = sabores.map(item => {
    const deleteItem = () => {
      let nuevoMonto = petipanesMonto - (petipanesOrden[0][item.itemCode]/5*2)
      delete(petipanesOrden[0][item.itemCode])
      dispatch({type:'AMOUNT_PETIPANES', payload: nuevoMonto})
      dispatch({type:'ORDER_PETIPANES', payload: petipanesOrden})
    }
    const cantidaD = (d) => {
      return <div className={`StorePetipanes_cantidad ` + d}>
        <div className={`StorePetipanes_cantidad_izq`}> {petipanesOrden[0][item.itemCode]}</div>
        <div className="StorePetipanes_cantidad_mid">{item.itemShortName}</div>
        <div className={`StorePetipanes_cantidad_der`} onClick={deleteItem}> x </div>
      </div>
    }
    if(petipanesOrden[0][item.itemCode]){
      if(nOfItems.length == 1) return cantidaD("StorePetipanes_cantida") 
      else return cantidaD("")
    } 
  })

  return (
    <div>
      <div className="StorePetipanes_botones">
        <div className="StorePetipanes_backButton" onClick={gohome}>Volver</div>
        Agregar:
        <div className="StorePetipanes_selector">
          {itemsPlusFive}
        </div>
        <div>Monto:</div>
        <div>{petipanesMonto}</div>
        <div className="StorePetipanes_cantidades">
          <div>En tu pedido hay: </div>
          <div>
            {nOfItems == "" ? 
              <div className="StorePetipanes_cantidadcero">
                Todavía no hay nada aquí.
              </div> : 
              itemsOnOrder}
          </div>
        </div>
      </div>
      {nOfItems == "" ? null : 
        <div>
          <div> Tu caja quedaría así: </div>
          <PetipanSimulator pedido={petipanesOrden[0]} /> 
        </div>
      }
    </div>
  )
}
