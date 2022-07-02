import React from 'react'
import './HomeNav.css'
import{useHistory} from "react-router-dom";

export default function HomeNav() {
  const history = useHistory()
  const gopage = () => {
    let option_value = document.getElementsByName("menu")[0].value
    if(option_value == "tienda"){
      history.push("/tienda")
    }
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
    </div>
  )
}
