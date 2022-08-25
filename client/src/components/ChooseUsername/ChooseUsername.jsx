import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { existsUsername, updateUser } from '../../firebase/firebase'
import AuthProvider from '../AuthProviver/AuthProvider'
import './ChooseUsername.css'
export default function ChooseUsername() {
  const [state, setstate] = useState(0)
  const [currentUser, setcurrentUser] = useState(null)
  const [username, setusername] = useState("")
  const [celular, setcelular] = useState("")
  const [errorMessages, seterrorMessages] = useState([])
  const navigate = useNavigate()
  function handleUserLoggedIn(user){ 
    navigate('/profile')
  }
  function handleUserNotRegistered(user){
    setcurrentUser(user)
    setstate(3)
  }
  function handleUserNotLoggedIn(){
    navigate('/login')
  }

  async function handleContinue() {
    seterrorMessages([])
    let newErrorMessages = []
    let pass = true
    if(username == ""){
      pass = false
      newErrorMessages.push("El nombre de usuario no puede estar vacío.")
      seterrorMessages(newErrorMessages)
    }
    if(celular == ""){
      pass = false
      newErrorMessages.push("El campo de celular no puede estar vacío.")
      seterrorMessages(newErrorMessages)
    }
    if(celular.toString().length < 9 ){
      pass = false
      newErrorMessages.push("El número de whatsapp no puede ser menor a 9 dígitos.")
      seterrorMessages(newErrorMessages)
    }
    if(pass){
      try {
        const tmp = {...currentUser}
        tmp.username = username;
        tmp.celular = celular;
        tmp.processCompleted = true;
        await updateUser(tmp)
        navigate('/profile')
      } catch (error) {
        console.log({...error})
      }
    }
  }

  const errores = errorMessages.map((mess, index)=><div key={index} className="mess"> {`${mess}`}</div>)
  
  if(state == 3 || state == 5 ){
    return (
      <div className="ChooseUsername">
        <h1>¡Bienvenido{currentUser.displayName ? `, ${currentUser.displayName}` : ""}! </h1>
        <div className="Cart_titulo">
          Datos básicos:
        </div>
        <div className="ChooseUsername_inputs">
          <input type="text" onChange={ (e) => {setusername(e.target.value)}} placeholder="nombre de usuario" className="Cart_input_text" /> 
          <input type="number" onChange={ (e) => {setcelular(e.target.value)}} placeholder="whatsapp de contacto" className="Cart_input_text"/>
          <div className="btn btn_tomato" onClick={handleContinue}>Continuar</div>
        </div>
        {errores}
      </div>
    )
  }

  return (
    <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Cargando...</div>
    </AuthProvider>
  )
}
