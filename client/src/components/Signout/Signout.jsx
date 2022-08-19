import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../firebase/firebase'
import AuthProvider from '../AuthProviver/AuthProvider'

export default function SignOut() {
  const navigate = useNavigate()
  async function handleUserLoggedIn(user){
    await logOut()
    await navigate(0)
  }
  async function handleUserNotRegistered(user){
    await navigate('/tienda/login')
  }
  async function handleUserNotLoggedIn(){
    await navigate('/tienda/login')
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
