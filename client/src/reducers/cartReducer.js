const initialData = {
    carrito : []
}

function cartReducer(state = initialData, action){
    switch(action.type){
        case 'ADD_CART' : return {
            ...state,
            carrito: [...state.carrito, action.payload]
        }
    }
    return state
}

export default cartReducer