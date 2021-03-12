import {SAVEPRODLIST} from '../action_types'
let initState = []
export default function prod(preState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVEPRODLIST:
            newState = [...data]
            return newState ;
        
        default:
            return preState;
    }

}