import { SET_USER } from '../action/actionTypes'

const initialState = {
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user.payload
      }
    default: return state
  }
}