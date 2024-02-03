/* eslint-disable */ 
import {SET_USER_DATA,LOG_OUT_USER} from './userTypes'

const initialState = {
  userData: null,
  token:null,
  role:null
}

const userReducer = (state = initialState,action) => {
  // console.log(action)
  switch(action.type) { 
    case SET_USER_DATA :
      return {
        ... state,
        userData:action.userData,
        token:action.token,
        role:action.role
      }
      case LOG_OUT_USER :
        return initialState
      default : return state
  }
}

export default userReducer