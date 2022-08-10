import { combineReducers } from "redux";
import orderReducer from './orderReducer'
import itemsReducer from './itemsReducer'
import tipsReducer from './tipsReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    itemsReducer: itemsReducer,
    tipsReducer: tipsReducer,
    cartReducer: cartReducer
})

export default rootReducer

