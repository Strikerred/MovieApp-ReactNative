import {
    TOKEN,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
  } from '../actions/user';
  
  const user = (
    state = {
      currentUser: null,
      token: null,
      email: '',
      password: '',
    },
    action,
  ) => {
    switch (action.type) {
        case TOKEN:
        return {...state, token: action.payload};
        case UPDATE_EMAIL:
        return {
            ...state,
            email: action.email,
            emailError: action.error,
            signInError: '',
        };
        case UPDATE_PASSWORD:
        return {
            ...state,
            password: action.password,
            signInError: '',
        };
        default:
            return state;
    }
  };
  
  export default user;
  