import React from 'react'
import './HomeBody.css'
import h1 from './../Images/h1.jpg'
import h2 from './../Images/h2.png'
import h3 from './../Images/h3.png'
import h4 from './../Images/h4.png'
import { useNavigate } from 'react-router-dom'

export default function HomeBody() {
    const navigate = useNavigate()
    const goTienda = () => {
        navigate("/tienda")
    }
    return (
        <div className="HomeBody" onClick={goTienda}>
            <img src={h4} alt="Un dia vendiendo panes" className="HomeBody_imgprincipal"/>
            <div className="HomeBody_cuadro">
                ¡Degusta nuestra variedad de petipanes!
            </div>
            <img src={h3} alt="Un dia vendiendo panes" className="HomeBody_imgprincipal"/>
            <div className="HomeBody_cuadro">
                ¡Nos preocupamos por que tu experiencia sea memorable!
            </div>
            <img src={h2} alt="Un dia vendiendo panes" className="HomeBody_imgprincipal"/>
            <div className="HomeBody_cuadro">
                ¡Nuestra 
            </div>
            <img src={h1} alt="Un dia vendiendo panes" className="HomeBody_imgprincipal"/>
        </div>
    )
}
