import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../AuthProviver/AuthProvider';
import './Profile.css'
export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const navigate = useNavigate()
  const gologout = () => {
    navigate('/tienda/signout')
  }
  async function handleUserLoggedIn(user){
    setCurrentUser(user)
    setState(2)
  }
  function handleUserNotRegistered(user){
    navigate('/tienda/login')
  }
  function handleUserNotLoggedIn(){
    navigate('/tienda/login')
  }

  if(state==0){
    return ( 
      <AuthProvider 
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Cargando...
      </AuthProvider>
    )
  }
  return (
    <div className="Profile">
      <div>¡Hola {currentUser.username}!</div>
      <div onClick={gologout} className="btn btn_tomato" >logout</div>
    </div>
  )
}


