import { SET_USER_DATA ,LOG_OUT_USER}  from './userTypes';

export const setUserData = (userData,token,role) => {
  return {
    type: SET_USER_DATA,
    userData:userData,
    token:token,
    role:role
  }
}



export const logoutUser = () => {
  return {
    type: LOG_OUT_USER,
  }
}

