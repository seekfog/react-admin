import {SAVEUSER,DELETEUSER} from '../action_types'
let username = JSON.parse(localStorage.getItem('username'))
let isLogin = username ? true:false
let initState={
    username:username || '',
    isLogin:isLogin
}
export default function login(preState=initState,action){
    const {type,data} = action
    let newState
    switch (type) {
        case SAVEUSER:
            return {username:data.username,isLogin:true} ;
        case DELETEUSER:
            return {username:'',isLogin:false}
        default:
            return preState;
    }

}