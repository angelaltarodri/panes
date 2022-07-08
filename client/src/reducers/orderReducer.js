const initialData = {
    petipanes: [{}],
}

function orderReducer(state = initialData, action){
    switch(action.type){
        case 'ORDER_PETIPANES' : return {
            ...state,
            petipanes: [...action.payload]
        }
    }
    return state
}

export default orderReducer