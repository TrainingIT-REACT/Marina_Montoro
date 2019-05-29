import types from './types';

export const loginUser = (name) => ({
  type: types.LOGIN_USER,
  name
});