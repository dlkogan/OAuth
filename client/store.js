import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  user: {},
};

const GET_USER = 'GET_USER';

const getUser = user => ({
  type: GET_USER,
  user,
});

export const login = formData => async dispatch => {
  try {
    const { data } = await axios.put('/auth/login', formData);
    dispatch(getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const getMe = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.delete('/auth/logout');
    dispatch(getUser(initialState.user));
  }
  catch (error) {
     console.error(error);
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
