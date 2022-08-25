import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,  FacebookAuthProvider } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { auth, userExists } from '../../firebase/firebase'
import {useNavigate} from 'react-router-dom'
import AuthProvider from '../AuthProviver/AuthProvider';
import './Login.css'
import google from '../Images/google.png'
import facebook from '../Images/facebook.png'
export default function Login() {
  const navigate = useNavigate()
  const [state, setstate] = useState(0)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cargando, setcargando] = useState(false)
  const [login, setlogin] = useState(0)
  const [errorMessages, seterrorMessages] = useState([])
  const errores = errorMessages.map((mess, index)=><div key={index} className="mess"> {`${mess}`}</div>)
  async function signUp(e){
    seterrorMessages([])
    let newErrorMessages = []
    let pass = true
    try {
      e.preventDefault()
      await createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
      await setstate(0)
    } catch (error) {
      console.log({...error})
      if({...error}.code==="auth/weak-password"){
        newErrorMessages.push("La contraseña debe tener al menos 6 digitos.")
        seterrorMessages(newErrorMessages)
      }
    }
  }
  async function signIn(e){
    seterrorMessages([])
    let newErrorMessages = []
    let pass = true
    try {
      e.preventDefault()
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      await setstate(0)
    } catch (error) {
      console.log({...error})
      if({...error}.code==="auth/user-not-found"){
        newErrorMessages.push("La cuenta no ha sido registrada aún.")
        seterrorMessages(newErrorMessages)
      }
      if({...error}.code==="auth/wrong-password"){
        newErrorMessages.push("La contraseña es incorrecta.")
        seterrorMessages(newErrorMessages)
      }
    }
  }
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
  */

  async function handleOnClickGoogle(){
      const googleProvider = new GoogleAuthProvider();
      await signInWithGoogle(googleProvider)

      async function signInWithGoogle(googleProvider) {
        try{
          const res = await signInWithPopup(auth, googleProvider);
          navigate('/choose-username')
        } catch(e) {
          console.log({...e});
        }
      }
  }
  async function handleOnClickFacebook(){
    seterrorMessages([])
    let newErrorMessages = []
    const facebookProvider = new FacebookAuthProvider();
    await signInWithFacebook(facebookProvider)
    async function signInWithFacebook(facebookProvider) {
      try{
        const res = await signInWithPopup(auth, facebookProvider);
        console.log(res)
        navigate('/choose-username')
      } catch(e) {
        newErrorMessages.push(`Su cuenta ${{...e}.customData.email} ha sido previamente iniciada con Google. Por favor, dé click en Continuar con Google`)
        seterrorMessages(newErrorMessages)
        console.log({...e});
      }
    }
  }

  function changeLoginState(e){
    const id = e.target.id
    if (id=="login") {
      if( login === 0 ) setlogin(1)
      if( login === 1 ) setlogin(0)
      if( login === 3 ) setlogin(1)
    } else {
      if( login === 0 ) setlogin(3)
      if( login === 3 ) setlogin(0)
      if( login === 1 ) setlogin(3)
    }
  }

  function handleUserLoggedIn(user){ 
    navigate('/profile')
  }
  function handleUserNotRegistered(user){
    navigate('/choose-username')
  }
  function handleUserNotLoggedIn(){
    setstate(4)
  }

  if(state === 4){
    return <div className='Login'>
      <div className="Login_buttons">
        <div className="StoreBody_titulo">INICIAR SESIÓN</div> <br />
        <div onClick={handleOnClickGoogle} className="btn_login google">
          <img src={google} alt="" height="25px" style={{margin:'0px 20px 0px 20px'}}/>
          Continuar con Google
        </div>  
        <div onClick={handleOnClickFacebook} className="btn_login facebook">
          <img src={facebook} alt="" height="28px" style={{margin:'0px 18px 0px 20px'}}/>
          Continuar con Facebook
        </div>  
        o
        <div className={`btn_login login_normal ${login == 1? "login_normal_active" : ""}`} onClick={(e)=>changeLoginState(e)} id="login">Iniciar sesión</div>
        <div style={{display:`${login==1 ? "flex" : "none"}`}} className="btn_login_table">
          <div className="login_table_body">
            <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" className="Cart_input_text" placeholder="e-mail"/> <br />
            <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" className="Cart_input_text" placeholder="contraseña"/>
          </div>
          <div className="btn_login login_normal login_normal_bottom" onClick={signIn}>Entrar</div>
        </div>
        <div className={`btn_login login_register ${login == 3? "register_normal_active" : ""}`} onClick={(e)=>changeLoginState(e)} id="register">Crear una cuenta</div>
        <div style={{display:`${login==3 ? "flex" : "none"}`}} className="btn_login_table">
          <div className="login_table_body">
            <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" className="Cart_input_text" placeholder="e-mail"/> <br />
            <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" className="Cart_input_text" placeholder="contraseña"/>
          </div>
          <div className="btn_login login_normal register_normal_bottom" onClick={signUp}>Registrar</div>
        </div>
      </div>
      {errores}
      {
      cargando ? 
      <div>
        Cargando...
      </div>
      :null
      }
    </div>
  }

  return <AuthProvider 
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      Cargando...
  </AuthProvider>
}