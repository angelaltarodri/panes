import React, { useState } from 'react'
import { useHistory, Link} from 'react-router-dom'
import { existsUsername, updateUser } from '../../firebase/firebase'
import AuthProvider from '../AuthProviver/AuthProvider'

export default function ChooseUsername() {
  const [state, setstate] = useState(0)
  const [currentUser, setcurrentUser] = useState(null)
  const [username, setusername] = useState("")
  const history = useHistory()
  function handleUserLoggedIn(user){ 
    history.push('/tienda/profile')
  }
  function handleUserNotRegistered(user){
    setcurrentUser(user)
    setstate(3)
  }
  function handleUserNotLoggedIn(){
    history.push('/tienda/login')
  }

  async function handleContinue() {
    if(username != ""){
      const exists = await existsUsername(username);
      if(exists){
        setstate(5);
      } else {
        const tmp = {...currentUser}
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp)
        history.push('/tienda/profile')
      }
    }
  }
  if(state == 3 || state == 5 ){
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName} </h1>
        <p>Para terminar el proceso elige un nombre de usuario.</p>
        {state == 5 ? <p>El nombre de usuario ya existe, escoge otro.</p> : ""}
        <div>
          <input type="text" onChange={ (e) => {setusername(e.target.value)}} />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  )
}
