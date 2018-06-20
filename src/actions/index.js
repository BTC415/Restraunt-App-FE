export const myAction = () => ({
  type: 'ACTION_CODE',
  payload: 'aa',
});

export const authLogin = (email, password) => ({
  type: 'AUTH_LOGIN',
  payload: {
    email,
    password,
  },
});

export const authRegister = (email, password) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email,
    password,
  },
});

export const fetchRestaurant = (id = null) => ({
  type: 'FETCH_RESTAURANT',
  payload: {
    id,
  },
});
