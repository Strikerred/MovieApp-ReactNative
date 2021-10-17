import axios from 'axios';
import {BASE_URL} from '../../constants/index';
import * as RootNavigation from '../../navigation/RootNavigation';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const TOKEN = 'TOKEN';

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    email: email.trim(),
    error: '',
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    password: password.trim(),
    error: '',
  };
};

export const signin = body => {
  return async dispatch => {
    try {
      const {email, password} = body;
      let token = '';
      let requestBody = {
        email: email.trim(),
        password: password,
      };

      const response = await axios.post(BASE_URL, requestBody);
      //console.log('-------STATUS-------', response.status);
      //console.log('-------TOKEN-------', response.data);
      if(response.status === 200){
        dispatch({
            type: TOKEN, 
            payload: response.data});
        RootNavigation.navigate('Home');
    }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: e,
      });
    }
  };
};
