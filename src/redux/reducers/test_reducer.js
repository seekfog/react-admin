import {ACTION1,ACTION2} from '../action_types'
let initState='hello'
export default function test(preState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case ACTION1:
            newState=preState+data
            return newState;
        case ACTION2:
            newState=preState+data+'@__@'
            return newState;
        default:
            return preState;
    }

}