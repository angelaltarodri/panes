import React, { useEffect, useState } from 'react'
import{ useParams, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import "./StorePetipanes.css"
import "../StoreTips/StoreTips.css"
import PetipanSimulator from '../PetipanSimulator/PetipanSimulator'
import StorePetipanes_helpButtons from './StorePetipanes_helpButtons';
import StorePetipanes_itemsOnOrder from './StorePetipanes_itemsOnOrder';
import StorePetipanes_itemsPlusFive from './StorePetipanes_itemsPlusFive';
import StoreTips from '../StoreTips/StoreTips';
import { tipEliminarSabores, tipNumeroCajas, tipMasCincoUnidades} from '../StoreTips/Tips'

export default function StorePetipanes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cant} = useParams()
  const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
  const paquetes = useSelector(store => store.itemsReducer.petipanesPaquetes)  
  const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 

  useEffect(()=>{
    if(cant%25 !== 0 || cant > 100){
      navigate("/")
    }
    if (petipanesMonto == 0){
      const montoElegido = paquetes.find(paquete => paquete.paqueteNumero == cant).paquetePrecio
      dispatch({type:'AMOUNT_PETIPANES', payload:montoElegido})
    }
  },[])

  // Sabores dentro de la orden
  const saboresInOrder = Object.keys(petipanesOrden[0])
  // Número de petipanes en la orden
  const nOfPetipanes = Object.values(petipanesOrden[0]).reduce(function(a, b){
    return a + b;
  }, 0);
// ¿un nuevo componente?
  const [isready, setisready] = useState("")
  const isReady = () => {
    return new Promise((resolve, reject) => {
      cant == nOfPetipanes ? setTimeout(() => resolve('StorePetipanes_cantidad_ready'), 10) : reject('')
    });
  }
  useEffect(()=>{
    isReady().then(res =>setisready(res)).catch(err=>setisready(err))
  },[nOfPetipanes])

  const enviarPedido = () => {
    // enviar al Storage
    // los items que pide el cliente (sabores de petipanes)
    // y el monto total.
    const pedido = {
      asunto: 'petipanes',
      items: petipanesOrden[0],
      monto: petipanesMonto
    }
    dispatch({type:'ADD_CART', payload:pedido})
    dispatch({type:'ERASE_ORDER'})
    navigate('/carrito')
  }

  return (
    <div className="StorePetipanes_container">
      <div className="StorePetipanes_botones">
        <StoreTips text={tipNumeroCajas()} titulo={"AumentaCajas"}/>
        <StorePetipanes_helpButtons cant={cant}/> 
        <StoreTips text={tipMasCincoUnidades()} titulo={"AumentaCincoUnidades"}/>
        {cant == nOfPetipanes ? 
          null
          : <StorePetipanes_itemsPlusFive cant={cant}/>
        }
        {
          nOfPetipanes > 0 ? 
          <StoreTips text={tipEliminarSabores()} titulo={"EliminarSabores"}/>
          : null
        }
        <div className="StorePetipanes_cantidades">
          <div>
            {saboresInOrder == "" ? 
            <div className={`StorePetipanes_cantidad_no `}>
              <div>
                ¡hola! elige tus sabores
              </div>
            </div>: 
            <StorePetipanes_itemsOnOrder cant={Number(cant)} nOfPetipanes={nOfPetipanes}/>
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
      {cant == nOfPetipanes ? 
      <div className={`StorePetipanes_listo ${isready}`}>
        <div>¿Desea enviar su orden al carrito de compras?</div> 
        <div className={`btn btn_warning`} onClick={enviarPedido}>ENVIAR</div>
      </div>
      : null}
      {saboresInOrder == "" ? null : 
      <div>
        <div className='StorePetipanes_inicioSimulator'> Tu pedido quedaría así: </div>
        <PetipanSimulator pedido={petipanesOrden[0]} /> 
      </div>
      }
    </div>
  )
}
