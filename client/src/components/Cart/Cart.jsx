import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Cart.css'
import { useHistory } from 'react-router-dom'
import CartTabla from './CartTabla'
import DescripcionExacta from '../DescripcionExacta/DescripcionExacta';
export default function Cart() {
  const carrito = useSelector(store => store.cartReducer.carrito) 
  const history = useHistory()
  const gohome = () => history.push("/tienda")
  const [fecha, setfecha] = useState('2022-12-01')
  const [hora, sethora] = useState('16:30')
  const [direccion, setdireccion] = useState('Calle Los Girasoles 197')
  const [distrito, setdistrito] = useState('La Molina')
  const distritos = ['La Molina', 'Surco', 'San Borja', 'Chorrillos', 'Surquillo', 'Miraflores', 'San Isidro', 'Lince', 'La Victoria', 'Jesus María', 'San Miguel', 'Pueblo Libre', 'SJM','VMT']
  return (
    <div className="Cart">
      <div className="Cart_volver">
          <div onClick={gohome}>Volver</div> 
          <div> ¡Hola, __ ! </div>
      </div>
      <div className='Cart_titulo'> Datos del carrito </div>
      <CartTabla />
      <div className='Cart_titulo'> Datos del envio </div>
      <div className='Cart_cuadro Cart_cuadro_column'>
        <input type="text" className='Cart_input_text' value={direccion} onChange={(e)=>{setdireccion(e.target.value)}}/>
        <select name="" id="" className='Cart_input_select' value={distrito} onChange={(e)=>{setdistrito(e.target.value)}}>
          {
            distritos.map(dist => {
              return <option value={dist} key={dist} >{dist}</option>
            })
          }
        </select>
        <div className='Cart_subcuadro'>
          <input type="date" name="" id="" className="Cart_input_date" placeholder="Type Date" value={fecha} onChange={(e)=>{setfecha(e.target.value)}}/>
          a las 
          <input type="time" name="" id="" className="Cart_input_time" placeholder="09:00" value={hora} onChange={(e)=>{sethora(e.target.value)}}/>
        </div>
        <textarea name="" id="" cols="27" rows="5" className='Cart_input_textarea' value={`${DescripcionExacta(fecha, hora, direccion, distrito)}`} readOnly="readonly" style={{backgroundColor:'green', color:'white'}}/>
        <textarea name="" id="" cols="27" rows="5" className='Cart_input_textarea' placeholder='¿Algun detalle adicional? QUE TENGA UNA NOTA QUE DIGA "¡FELIZ CUMPLEAÑOS! ATTE. GABI." Y DEJAR AL VIGILANTE DEL EDIFICIO DE PARTE MIA.'></textarea>
      </div>
      <div className='Cart_titulo'> Mi número de contacto:</div>  
      <div className='Cart_cuadro'>
        
      </div>
    </div>
  )
}
