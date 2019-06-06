import types from './types';

export const loginUser = (name) => ({
  type: types.LOGIN_USER,
  name
});

export const logged = (isLogged) =>({
  type: types.IS_LOGGED,
  isLogged
});
