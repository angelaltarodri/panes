import React, { useEffect } from 'react'
import './PetipanSimulator.css'
import {useSelector} from 'react-redux'
export default function PetipanSimulator({pedido}) {
    const items = useSelector(store => store.itemsReducer.items)  
    function pedidoimagen() {
        let pedidoimagen = ""
        
        let pedido_keys = Object.keys(pedido)
        let pedido_values = Object.values(pedido)
        let contador = 0
        for (let i = 0; i <pedido_keys.length; i++) {
            for (let j = 0; j < pedido_values[i]; j++) {
                if(contador%25 == 0){
                    pedidoimagen += "<div id='caja'>"
                }
                if( j%5 == 0 ){
                    pedidoimagen += "<div>"
                }
                for (let k = 0; k < items.length; k++) {
                    if (pedido_keys[i] == items[k].itemCode){
                        pedidoimagen += `<div id="petipan" style="background-color:${items[k].itemBackgroundColor}"></div>`
                    }
                }
                if(j != 0 && (j-4)%5 == 0){
                    pedidoimagen += "</div>"
                }
                if((contador+1)%25==0 ){
                    pedidoimagen += "</div>"
                }
                contador += 1
            }
        }
        document.getElementById("pedidoimagen").innerHTML = pedidoimagen
    }
    
    useEffect(()=> {
        pedidoimagen()
    })

    return (
        <div className="PetipanSimulator">
            <div id="pedidoimagen"></div>
        </div>
    )
}
