const initialData = {
    carrito : [],
    montos: 0
}

function orderReducer(state = initialData, action){
    switch(action.type){
        case 'ADD_CART' : return {
            ...state,
            carrito: [...action.payload]
        }
    }
    return state
}

export default orderReducer