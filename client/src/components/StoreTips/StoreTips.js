import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function StoreTips({text, titulo}) {
    const dispatch = useDispatch()
    const [display, setdisplay] = useState("none")
    const tips = useSelector(store => store.tipsReducer.tips) 
    const currentTip = tips.find(tip => tip["titulo"] == titulo)
    useEffect(()=>{
        if(!currentTip){
            dispatch({type:'ADD_TIP', payload:{
                titulo: titulo,
                state: false
            }})
        }
        if(currentTip){
            currentTip["state"] ? setdisplay("none") : setdisplay("flex")
        }
    },[])
    const disappear = (e) => { 
        const par = e.currentTarget.parentNode
        par.style.display = "none"
        dispatch({type:'DELETE_TIP', payload:currentTip})
        dispatch({type:'ADD_TIP', payload:{
            titulo: titulo,
            state: true
        }})

    }
    return (
        <div className="StoreTips_container" style={{display: display}}>
            <div className="StoreTips_text">
               {text}
            </div>
            <div className="btn btn_warning" onClick={(e)=>disappear(e)}>
                Entendido
            </div>
        </div>
    )
}
