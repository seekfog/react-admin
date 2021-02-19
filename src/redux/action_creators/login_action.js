import {SAVEUSER,DELETEUSER} from '../action_types'
export const saveUserInfo = (value) => {
    localStorage.setItem('username',JSON.stringify(value.username))
    // localStorage.setItem('username',JSON.stringify(value.username))
    return {type:SAVEUSER,data:value }
}
export const deleteUserInfo = () => {
    localStorage.removeItem('username')
    // localStorage.setItem('username',JSON.stringify(value.username))
    return {type:DELETEUSER}
}
