import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
export default function StorePetipanes_itemsOnOrder({cant, nOfPetipanes}) {
    const dispatch = useDispatch()
    const [isready, setisready] = useState("")
    const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
    const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 
    const sabores = useSelector(store => store.itemsReducer.petipanesSabores)  
    const isReady = () => {
      return new Promise((resolve, reject) => {
        cant == nOfPetipanes ? setTimeout(() => resolve('StorePetipanes_cantidad_ready'), 10) : reject('')
      });
    }
    
    useEffect(()=>{
      isReady().then(res =>setisready(res)).catch(err=>setisready(err))
    },[nOfPetipanes])

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
            <div className={`StorePetipanes_cantidad_izq ${isready}`}> {petipanesOrden[0][item.itemCode]}</div>
            <div className={`StorePetipanes_cantidad_mid ${isready}`}>{item.itemMiniName}</div>
            {item.itemPriceChange > 0 ? 
              <div className={`StorePetipanes_cantidad_subcolored`}>
                + {item.itemPriceChange*petipanesOrden[0][item.itemCode]/5}
              </div>
            : <div className={`StorePetipanes_cantidad_submid ${isready}`} />}
            <div className={`StorePetipanes_cantidad_der`} onClick={deleteItem}> x </div>
          </div>
        } else {
          return null
        }
    })
    return itemsOnOrder
}
