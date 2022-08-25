import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import CartTabla from './CartTabla'
import DescripcionExacta from '../DescripcionExacta/DescripcionExacta';
import AuthProvider from '../AuthProviver/AuthProvider'
import { updateUser } from '../../firebase/firebase'
import {nvaHora} from '../DescripcionExacta/NvaHora'
import { sumaMontos } from './SumaMontos'
export default function Cart() {
  const carrito = useSelector(store => store.cartReducer.carrito) 
  const [currentUser, setcurrentUser] = useState({});
  const [celular, setcelular] = useState({});
  const navigate = useNavigate()
  const gohome = () => navigate("/")
  const [state, setstate] = useState(0)
  const [fecha, setfecha] = useState('')
  const [hora, sethora] = useState('')
  const [direccion, setdireccion] = useState('')
  const [distrito, setdistrito] = useState('')
  const [comentario, setcomentario] = useState('')
  const [errorMessages, seterrorMessages] = useState([])
  const sumaMonto = sumaMontos()
  const distritos = ['La Molina', 'Surco', 'San Borja', 'Chorrillos', 'Surquillo', 'Miraflores', 'San Isidro', 'Lince', 'La Victoria', 'Jesus María', 'San Miguel', 'Pueblo Libre', 'SJM','VMT']
  const ready = direccion !== "" && distrito !== "" && hora !== "" && fecha !== "" && direccion !== "" && carrito.length !== 0
  const [isready, setisready] = useState("")
  const isReady = () => new Promise((resolve, reject) => ready ? setTimeout(() => resolve('StorePetipanes_cantidad_ready'), 10) : reject(''));
  useEffect(()=>{
    isReady().then(res =>setisready(res)).catch(err=>setisready(err))
  },[ready])

  const handleBlur = async (key, value) => {
    window.parent.document.body.style.zoom = "100%";
    let pass = true
    seterrorMessages([])
    let newErrorMessages = []
    try {
      if(celular == ""){
        pass = false
        newErrorMessages.push("El campo de whatsapp no puede estar vacío.")
        seterrorMessages(newErrorMessages)
      }
      if(celular.toString().length < 9 ){
        pass = false
        newErrorMessages.push("El número de whatsapp no puede ser menor a 9 dígitos.")
        seterrorMessages(newErrorMessages)
      }
      if(pass){
        const tmp = {...currentUser}
        tmp[key] = value;
        await updateUser(tmp)
      }
    } catch (error) {
      console.log({...error})
    }
  }
  
  const getUnaHoraAntes = (hora) => {
    return `${Number(nvaHora(hora).substr(0, 2))-1}:${nvaHora(hora).substr(3, 5)}`
  }

  const errores = errorMessages.map((mess, index)=><div key={index} className="mess"> {`${mess}`}</div>)

  if (state === 2 ) {
    return <div className="Cart">
    <div className="Cart_volver">
        <div onClick={gohome}>Volver</div> 
        <div> ¡Hola{currentUser.username ? `, ${currentUser.username}` : ""}! </div>
    </div>
    <div className='Cart_titulo'> Datos del carrito </div>
    <CartTabla />
    {currentUser.celular ? <form spellCheck="false" className="Cart_form">
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
        { hora? 
          <div className={`mess ${ready ? "cart_ready" : ""} `} style={{width:'300px'}}>
            Su pedido estaría llegando entre las {getUnaHoraAntes(hora)} y {nvaHora(hora)}
          </div> : ""
        }
        <textarea value={comentario} onChange={(e)=>{setcomentario(e.target.value)}} name="" id="" cols="27" rows="5" className={`Cart_input_textarea ${comentario.length !== 0 ? "cart_ready" : ""} `} placeholder='¿Algun detalle adicional? EJ. Dejar en la portería/ Agregar una nota de felicitaciones o de cumpleaños/ que los petipanes esten en un orden específico.' onBlur={()=>handleBlur("comentario", comentario)}></textarea>
        { ready ? <DescripcionExacta fecha={fecha} hora={hora}  direccion={direccion} distrito={distrito}/> : "" }
      </div>
      <div className='Cart_titulo'> Mi whatsapp de contacto</div>  
      <div className='Cart_cuadro'>
        <input type="number" name="" id="" className={`Cart_input_celular ${ready ? "cart_ready" : ""} `} value={celular} onChange={(e)=>{setcelular(e.target.value)}} onBlur={()=>handleBlur("celular", celular)} />
      </div>
      {errores}
    </form> : 
    <div className="mess"> 
      Para hacer su pedido debe registrarse antes
      <div className='btn btn_warning' onClick={()=>navigate('/tienda/login')}>Ir a registro</div>
    </div>
    }
    {
      ready? 
        <div className='Cart_form'>
          <div className='Cart_titulo'> Condiciones</div>  
          <div className={`Cart_cuadro_condition ${isready ? "cart_conditions" : ""}`}>
            Recuerde que para que su <br /> pedido proceda se debe:
            <div className='Cart_cuadro_conditions'> 
              <div className="Cart_cuadro_conditions_number">
                1
              </div>
              <div className="Cart_cuadro_conditions_text">
                Realizar en un plazo mínimo de 24 h antes. 
              </div>
            </div>
            <div className='Cart_cuadro_conditions'> 
              <div className="Cart_cuadro_conditions_number">
                2
              </div>
              <div className="Cart_cuadro_conditions_text ">
                {`Abonar el monto de S/${sumaMonto} en alguna de nuestras cuentas.`}
              </div>
            </div>
          </div>
        </div>
        : ""
    }
    {ready ?
    <div className={`StorePetipanes_listo ${isready ? "cart_ready" : ""}`}>
      <div>¿Desea enviar su orden al carrito de compras?</div> 
      <div className={`btn btn_warning`}>ENVIAR</div>
    </div> : ""}
  </div>
  }

  function handleUserLoggedIn(user){
    setcurrentUser(user)
    setcelular(user.celular)
    user.direccion? setdireccion(user.direccion) : null
    user.distrito? setdistrito(user.distrito) : null
    setstate(2)
  }
  function handleUserNotRegistered(user){
    navigate('/choose-username')
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
