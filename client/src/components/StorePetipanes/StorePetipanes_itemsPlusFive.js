import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
export default function StorePetipanes_itemsPlusFive({cant}) {
    const dispatch = useDispatch()
    const sabores = useSelector(store => store.itemsReducer.petipanesSabores)  
    const petipanesOrden = useSelector(store => store.orderReducer.petipanesOrden) 
    const petipanesMonto = useSelector(store => store.orderReducer.petipanesMonto) 
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
    return (
        <div className="StorePetipanes_selector">
        {itemsPlusFive}
      </div>
    )
}
