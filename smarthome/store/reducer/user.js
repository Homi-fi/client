import { SET_USER, SET_SUCCESS } from '../action/actionTypes'

const initialState = {
  user: {},
  success:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user.payload
      }
    case SET_SUCCESS:
      return {
        ...state,
        success: action.success
      }
    default: return state
  }
}