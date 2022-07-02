import { combineReducers } from "redux";
import orderReducer from './orderReducer'
import itemsReducer from './itemsReducer'

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    itemsReducer: itemsReducer
})

export default rootReducer

