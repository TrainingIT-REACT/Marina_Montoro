import types from '../actions/types';

// Estado inicial
const initialState = {
  name: "",
  isLogged: false
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_USER:
      return {
        name: action.name
      };
    case types.IS_LOGGED:
        return {
          ...state,
          isLogged: action.isLogged
        }
    default:
      return state;
  }
}

export default reducer;