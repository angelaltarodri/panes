import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, fetchSignInMethodsForEmail, signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, userExists } from '../../firebase/firebase'
import {useHistory} from 'react-router-dom'
import AuthProvider from '../AuthProviver/AuthProvider';
import './Login.css'
export default function Login() {
  const history = useHistory()
  // const [currentUser, setcurrentUser] = useState(null)
  /*
  State:
  0: inicializando
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  5: ya existe el username
  6: nuevo username, click para continuar
  7: username no existe
  8: el usuario ha iniciado previamente una cuenta con google
  */

  const [state, setstate] = useState(0)
  const [emailerror, setemailerror] = useState('')

  // useEffect(()=>{
  //   setstate(1)
  //   onAuthStateChanged(auth, async (user) => {
  //     if(user){
  //       const isRegistered = await userExists(user.uid)
  //       if(isRegistered){
  //         // to do: redirigir al dashboard
  //         history.push('/tienda/dashboard')
  //         setstate(2)
  //       } else {
  //         // to do: redirigir a a choose-username
  //         history.push('/tienda/choose-username')
  //         setstate(3)
  //       }
        
  //     } else {
  //       setstate(4)
  //       console.log('No hay nadie autenticado...')
  //     }
  //   })
  // },[history])

  async function handleOnClickGoogle(){
      const googleProvider = new GoogleAuthProvider();
      await signInWithGoogle(googleProvider)

      async function signInWithGoogle(googleProvider) {
        try{
          const res = await signInWithPopup(auth, googleProvider);
          console.log(res)
        } catch(e) {
          setemailerror(`${{...e}.customData.email}`)
        }
      }
  }
  async function handleOnClickFacebook(){
    const facebookProvider = new FacebookAuthProvider();
    await signInWithFacebook(facebookProvider)

    async function signInWithFacebook(facebookProvider) {
      try{
        const res = await signInWithPopup(auth, facebookProvider);
        console.log(res)
      } catch(e) {
        setemailerror(`${{...e}.customData.email}`)
        console.log({...e});
      }
    }
  }

  async function Test () {
    
  }

  function handleUserLoggedIn(user){ 
    history.push('/tienda/profile')
  }
  function handleUserNotRegistered(user){
    history.push('/tienda/choose-username')
  }
  function handleUserNotLoggedIn(){
    setstate(4)
  }

  if(state === 4){
    return <div className='Login'>
      <div className="Login_buttons">
          <div onClick={handleOnClickGoogle} className="btn btn_tomato">Iniciar sesión con Google</div>  
          <div onClick={handleOnClickFacebook} className="btn btn_blue">Iniciar sesión con Facebook</div>  
      </div>
      { 
      emailerror != '' ? 
      <div className="StoreTips_container">
        <div className="StoreTips_text">
        Su cuenta <span style={{backgroundColor: "gold", color: "black", borderLeft: "10px solid gold", borderRight: "10px solid gold"}}>{emailerror}</span> <br /> ha sido previamente iniciada con Google. Por favor, dé click en <span style={{backgroundColor: "var(--tomato)", color: "white", borderLeft: "10px solid var(--tomato)", borderRight: "10px solid var(--tomato)"}}>Iniciar sesión con google</span>
        </div>
      </div>
      : null
      }
    </div>
  }

  return <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
  </AuthProvider>

  // if(state === 2){
  //   return <div>
  //     Esta autenticado y registrado
  //   </div>
  // }

  // if(state === 3){
  //   return <div>
  //     Esta autenticado pero no registrado
  //   </div>
  // }
  // return <div>
  //   Loading...
  // </div>
}
