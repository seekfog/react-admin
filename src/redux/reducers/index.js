import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuReducer from './menu_reducer'
import prodReducer from './product_reducer'
export default combineReducers({
    userInfo:loginReducer,
    titleInfo:menuReducer,
    prodInfo:prodReducer
})