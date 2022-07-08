import React, { useEffect, useState } from 'react'
import{useHistory, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'

export default function StorePetipanes() {
  const {cant} = useParams()
  const [monto, setmonto] = useState(0)
  const pedidos = useSelector(store => store.orderReducer.petipanes) 
  const history = useHistory()  
  const gohome = () => history.push("/tienda")
  const items = useSelector(store => store.itemsReducer.petipanesSabores)  
  const nOfItems = Object.keys(pedidos[0])
  const dispatch = useDispatch()

  const itemsPlusFive = items.map(item=> {
    if(!item.itemType.includes("adicional"))
    return <div className="StorePetipanes_opciones" onClick={()=>addToCart(item.itemCode)} style={{backgroundColor:item.itemBackgroundColor, color:item.itemTextColor}}>
      <div>
        <div> + 5 </div>
        <div> 
          {item.itemShortName} 
        </div>
      </div>
    </div>
  })

  const addToCart = (value) => {
    pedidos[0][value] ? pedidos[0][value] += 5 : pedidos[0][value] = 5
    dispatch({type:'ORDER_PETIPANES', payload: pedidos})
    console.log(pedidos)
  }

  const itemsOnOrder = items.map(item => {
    const deleteItem = () => {
      delete(pedidos[0][item.itemCode])
      dispatch({type:'ORDER_PETIPANES', payload: pedidos})
    }
    const cantidaD = (d) => {
      return <div className={`StorePetipanes_cantidad ` + d}>
        <div className={`StorePetipanes_cantidad_izq`}> {pedidos[0][item.itemCode]}</div>
        <div className="StorePetipanes_cantidad_mid">{item.itemShortName}</div>
        <div className={`StorePetipanes_cantidad_der`} onClick={deleteItem}> x </div>
      </div>
    }
    if(pedidos[0][item.itemCode]){
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
        <div>{monto}</div>
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
          <PetipanSimulator pedido={pedidos[0]}/> 
        </div>
      }
    </div>
  )
}
