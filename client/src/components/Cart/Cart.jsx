import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import CartTabla from './CartTabla'
import DescripcionExacta from '../DescripcionExacta/DescripcionExacta';
import AuthProvider from '../AuthProviver/AuthProvider'
import { updateUser } from '../../firebase/firebase'
export default function Cart() {
  const carrito = useSelector(store => store.cartReducer.carrito) 
  const [currentUser, setcurrentUser] = useState({});
  const navigate = useNavigate()
  const gohome = () => navigate("/tienda")
  const [state, setstate] = useState(0)
  const [fecha, setfecha] = useState('')
  const [hora, sethora] = useState('')
  const [direccion, setdireccion] = useState('')
  const [distrito, setdistrito] = useState('')
  const [comentario, setcomentario] = useState('')

  const distritos = ['La Molina', 'Surco', 'San Borja', 'Chorrillos', 'Surquillo', 'Miraflores', 'San Isidro', 'Lince', 'La Victoria', 'Jesus María', 'San Miguel', 'Pueblo Libre', 'SJM','VMT']
  const ready = direccion !== "" && distrito !== "" && hora !== "" && fecha !== "" && direccion !== "" && carrito.length !== 0
  const [isready, setisready] = useState("")
  const isReady = () => {
    return new Promise((resolve, reject) => {
      ready ? setTimeout(() => resolve('StorePetipanes_cantidad_ready'), 10) : reject('')
    });
  }
  useEffect(()=>{
    isReady().then(res =>setisready(res)).catch(err=>setisready(err))
  },[ready])

  const handleBlur = async (key, value) => {
    try {
      const tmp = {...currentUser}
      tmp[key] = value;
      await updateUser(tmp)
    } catch (error) {
      console.log({...error})
    }
  }
  
  if (state === 2 ) {
    return <div className="Cart">
    <div className="Cart_volver">
        <div onClick={gohome}>Volver</div> 
        <div> ¡Hola{currentUser.username ? `, ${currentUser.username}` : ""}! </div>
    </div>
    <div className='Cart_titulo'> Datos del carrito </div>
    <CartTabla />
    {currentUser.celular ? <>
    <div className='Cart_titulo'> Datos del envio </div>
    <div className='Cart_cuadro Cart_cuadro_column'>
      <input type="text" className={`Cart_input_text ${ready ? "cart_ready" : ""} `} value={direccion} 
      onChange={(e)=>{setdireccion(e.target.value)}} placeholder="Direccion"
      onBlur={()=>handleBlur("direccion", direccion)} />
      <select name="" id="" className={`Cart_input_select ${ready ? "cart_ready" : ""} `} value={distrito} 
      onChange={(e)=>{setdistrito(e.target.value)}} placeholder="Distrito"
      onBlur={()=>handleBlur("distrito", distrito)}>
        {
          distritos.map((dist, index) => {
            if(index === 0){
              return <option value="" key={dist} defaultValue disabled hidden>Distrito</option>
            } else {
              return <option value={dist} key={dist} >{dist}</option>
            }
          })
        }
      </select>
      <div className='Cart_subcuadro'>
        <input type="date" name="" id="" className={`Cart_input_date ${ready ? "cart_ready" : ""} `} value={fecha} onChange={(e)=>{setfecha(e.target.value)}}/>
        a las 
        <input type="time" name="" id="" className={`Cart_input_time ${ready ? "cart_ready" : ""} `} placeholder="00:00" value={hora} onChange={(e)=>{sethora(e.target.value)}}/>
      </div>
      <textarea value={comentario} onChange={(e)=>{setcomentario(e.target.value)}} name="" id="" cols="27" rows="5" className={`Cart_input_textarea ${comentario.length !== 0 ? "cart_ready" : ""} `} placeholder='¿Algun detalle adicional? EJ. Dejar en la portería/ Agregar una nota de felicitaciones o de cumpleaños/ que los petipanes esten en un orden específico.'></textarea>
      { ready ? <DescripcionExacta fecha={fecha} hora={hora}  direccion={direccion} distrito={distrito}/> : "" }
    </div>
    <div className='Cart_titulo'> Mi whatsapp de contacto</div>  
    <div className='Cart_cuadro'>
      <input type="number" readOnly="readonly" name="" id="" className="Cart_input_celular" value={`${currentUser.celular}`} />
    </div>
    </> : 
    <div className="mess"> 
      Para hacer su pedido debe registrarse antes
      <div className='btn btn_warning' onClick={()=>navigate('/tienda/login')}>Ir a registro</div>
    </div>
    }
    {ready && currentUser.celular ?
    <div className={`StorePetipanes_listo ${isready}`}>
      <div>¿Desea enviar su orden al carrito de compras?</div> 
      <div className={`btn btn_warning`}>ENVIAR</div>
    </div> : ""}
  </div>
  }

  function handleUserLoggedIn(user){
    setcurrentUser(user)
    user.direccion? setdireccion(user.direccion) : null
    user.distrito? setdistrito(user.distrito) : null
    setstate(2)
  }
  function handleUserNotRegistered(user){
    navigate('/tienda/choose-username')
  }
  function handleUserNotLoggedIn(){
    setstate(2)
  }

  return <AuthProvider
          onUserLoggedIn={handleUserLoggedIn}
          onUserNotRegistered={handleUserNotRegistered}
          onUserNotLoggedIn={handleUserNotLoggedIn}
          >
    <div>Cargando...</div>
  </AuthProvider>
}
