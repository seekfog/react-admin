import {SAVETITLE} from '../action_types'
let initState = ''
export default function menu(preState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVETITLE:
            newState = data
            return newState ;
        
        default:
            return preState;
    }

}