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
  // const paqueteElegido = paquetes.find(paquete => paquete.paqueteNumero == cant)
  const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
  const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 

  const gohome = () => history.push("/tienda")
  // Sabores dentro de la orden
  const saboresInOrder = Object.keys(petipanesOrden[0])
  // Número de petipanes en la orden
  const nOfPetipanes = Object.values(petipanesOrden[0]).reduce(function(a, b){
    return a + b;
  }, 0);

  const itemsPlusFive = sabores.map(item=> {
    const addToCart = () => {
      if (cant != nOfPetipanes){
        petipanesOrden[0][item.itemCode] ? petipanesOrden[0][item.itemCode] += 5 : petipanesOrden[0][item.itemCode] = 5
        let saborsito = sabores.find(sabor => sabor.itemCode == item.itemCode)
        dispatch({type:'AMOUNT_PETIPANES', payload: petipanesMonto + saborsito.itemPriceChange})
        dispatch({type:'ORDER_PETIPANES', payload: petipanesOrden})
      } else {
        alert("enough")
      }
    }
    if(!item.itemType.includes("adicional"))
    return <div className="StorePetipanes_opciones" onClick={addToCart} style={{backgroundColor:item.itemBackgroundColor, color:item.itemTextColor}}>
      <div>
        <div> + 5 </div>
        <div> 
          {item.itemShortName} { item.itemPriceChange > 0 ? "***" : null}
        </div>
      </div>
    </div>
  })

  const itemsOnOrder = sabores.map(item => {
    const deleteItem = () => {
      let nuevoMonto = petipanesMonto
      if (item.itemPriceChange > 0)
        nuevoMonto -= (petipanesOrden[0][item.itemCode]/5*2)
      delete(petipanesOrden[0][item.itemCode])
      dispatch({type:'AMOUNT_PETIPANES', payload: nuevoMonto})
      dispatch({type:'ORDER_PETIPANES', payload: petipanesOrden})
    }
    //si existe el item en forma de key en el obj petipanesOrden, se renderiza
    if(petipanesOrden[0][item.itemCode]){
      return <div className={`StorePetipanes_cantidad `}>
        <div className={`StorePetipanes_cantidad_izq`}> {petipanesOrden[0][item.itemCode]}</div>
        <div className="StorePetipanes_cantidad_mid">{item.itemMiniName}</div>
        {item.itemPriceChange > 0 ? 
          <div className={`StorePetipanes_cantidad_subcolored`}>
            + {item.itemPriceChange*petipanesOrden[0][item.itemCode]/5}
          </div>
        : <div className={`StorePetipanes_cantidad_submid`} />}
        <div className={`StorePetipanes_cantidad_der`} onClick={deleteItem}> x </div>
      </div>
    } 
  })

  return (
    <div>
      <div className="StorePetipanes_botones">
        <div className="StorePetipanes_helpButtons">
          <div onClick={gohome}>Volver</div> 
          <div>
            <div>
              <div className="StorePetipanes_">
                2 cajas
              </div>
              <div className="StorePetipanes_">
                +
              </div>
              <div className="StorePetipanes_">
                -
              </div>
            </div>
            <div>
              TOTAL: {cant} PETIPANES
            </div>
          </div>
        </div>
        <div className="StorePetipanes_selector">
          {itemsPlusFive}
        </div>
        <div className="StorePetipanes_cantidades">
          <div>
            {saboresInOrder == "" ? 
            <div className={`StorePetipanes_cantidad `}>
              <div>
                ¡hola! elige tus sabores
              </div>
            </div>: 
            itemsOnOrder}
            <div className={`StorePetipanes_cantidad `}>
              { cant == nOfPetipanes ?
                <div className="StorePetipanes_cantidad_orderr"> 
                  Tu pedido esta completo.
                </div>
                :
                <div className="StorePetipanes_cantidad_unique"> 
                  Elegiste {nOfPetipanes} pancitos de {cant}.
                </div>
              }
            </div>
            <div className={`StorePetipanes_cantidad `}>
              <div> 
                {cant} PETIPANES A S/ {petipanesMonto}
              </div>
            </div>
          </div>
        </div>
      </div>
      {saboresInOrder == "" ? null : 
        <div>
          <div> Tu pedido quedaría así: </div>
          <PetipanSimulator pedido={petipanesOrden[0]} /> 
        </div>
      }
    </div>
  )
}
