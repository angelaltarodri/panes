import React, { useEffect, useState } from 'react'
import{useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'
import StorePetipanes_helpButtons from './StorePetipanes_helpButtons';
import StorePetipanes_itemsOnOrder from './StorePetipanes_itemsOnOrder';
import StorePetipanes_itemsPlusFive from './StorePetipanes_itemsPlusFive';

export default function StorePetipanes() {
  const dispatch = useDispatch()
  const {cant} = useParams()
  const sabores = useSelector(store => store.itemsReducer.petipanesSabores)  
  const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
  const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 

  // Sabores dentro de la orden
  const saboresInOrder = Object.keys(petipanesOrden[0])
  // Número de petipanes en la orden
  const nOfPetipanes = Object.values(petipanesOrden[0]).reduce(function(a, b){
    return a + b;
  }, 0);

  return (
    <div className="StorePetipanes_container">
      <div className="StorePetipanes_botones">
        <StorePetipanes_helpButtons cant={cant}/>
        <StorePetipanes_itemsPlusFive cant={cant}/>
        <div className="StorePetipanes_cantidades">
          <div>
            {saboresInOrder == "" ? 
            <div className={`StorePetipanes_cantidad `}>
              <div>
                ¡hola! elige tus sabores
              </div>
            </div>: 
            <StorePetipanes_itemsOnOrder/>
            }
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
