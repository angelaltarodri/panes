import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import AuthProvider from '../AuthProviver/AuthProvider';
import './Profile.css'
export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const history = useHistory()
  const gologout = () => {
    history.push('/tienda/signout')
  }
  async function handleUserLoggedIn(user){
    setCurrentUser(user)
    setState(2)
  }
  function handleUserNotRegistered(user){
    history.push('/tienda/login')
  }
  function handleUserNotLoggedIn(){
    history.push('/tienda/login')
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


