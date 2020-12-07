import { createSlice } from '@reduxjs/toolkit';

type State = {
  login: 
    { 
      value: Boolean; 
      token: String;
    };
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: false,
    token: '',
  },
  reducers: {
    login: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    logout: state => {
      state.value = false;
      state.token = '';
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  },
});

export const { login, logout, setToken } = loginSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLoginState = (state: State) => state.login.value;

export const selectToken = (state: State) => state.login.token;

export default loginSlice.reducer;
