import { combineReducers } from "redux";
import orderReducer from './orderReducer'
import itemsReducer from './itemsReducer'
import tipsReducer from './tipsReducer'

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    itemsReducer: itemsReducer,
    tipsReducer: tipsReducer
})

export default rootReducer

