import {useSelector} from 'react-redux'
export const sumaMontos = () => {
    const carrito = useSelector(store => store.cartReducer.carrito) 
    let suma = 0
    for (let i = 0; i < carrito.length; i++) {
        suma += carrito[i].monto
    }
    return suma
}