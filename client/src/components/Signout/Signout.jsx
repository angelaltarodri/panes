import React from 'react'
import { useHistory } from 'react-router-dom'
import { logOut } from '../../firebase/firebase'
import AuthProvider from '../AuthProviver/AuthProvider'

export default function SignOut() {
  const history = useHistory()
  async function handleUserLoggedIn(user){
    await logOut()
  }
  function handleUserNotRegistered(user){
    history.push('/tienda/login')
  }
  function handleUserNotLoggedIn(){
    history.push('/tienda/login')
  }

  return (
    <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn} 
    onUserNotLoggedIn={handleUserNotLoggedIn} 
    onUserNotRegistered={handleUserNotRegistered}>
      Cerrando sesión...
    </AuthProvider>
  )
}
