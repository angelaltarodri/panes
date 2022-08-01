const initialData = {
    tips: [],
}

function tipsReducer(state = initialData, action){
    switch(action.type){
        case 'ADD_TIP' : return {
            ...state,
            tips: [...state.tips, action.payload]
        }
        case 'DELETE_TIP' : return {
            ...state,
            tips: state.tips.filter(tip => tip !== action.payload)
        }
    }
    return state
}

export default tipsReducer