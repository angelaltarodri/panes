const initialData = {
    petipanesOrden: [{}],
    petipanesMonto: 0
}

function orderReducer(state = initialData, action){
    switch(action.type){
        case 'ORDER_PETIPANES' : return {
            ...state,
            petipanesOrden: [...action.payload]
        }
        case 'ERASE_ORDER' : return {
            ...state,
            petipanesOrden: [{}]
        }
        case 'AMOUNT_PETIPANES' : return {
            ...state,
            petipanesMonto: action.payload
        }
    }
    return state
}

export default orderReducer