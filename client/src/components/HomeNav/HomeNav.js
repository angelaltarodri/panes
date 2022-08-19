import React from 'react'
import './HomeNav.css'
import{useNavigate} from "react-router-dom";
import { useEffect } from 'react';

export default function HomeNav() {
  const navigate = useNavigate()

  // useEffect(()=>{
  //   navigate('/tienda')
  // },[])

  const gopage = () => {
    let option_value = document.getElementsByName("menu")[0].value
    if(option_value == "tienda"){
      navigate("/tienda")
    }
  }

  const clearStorage = () => {
    localStorage.clear()
  }

  return (
    <div className="HomeNav">
      <div>EL CHICO DE LOS PANES</div>
      <select name="menu" onChange={gopage}>
        <option value="somos">Quienes somos</option>
        <option value="tienda">Tienda online</option>
        <option value="procesos">Procesos</option>
        <option value="prensa">Prensa</option>
        <option value="contacto">Contáctanos</option>
      </select>
      <button onClick={clearStorage}>
        Borrar Storage
      </button>
    </div>
  )
}
