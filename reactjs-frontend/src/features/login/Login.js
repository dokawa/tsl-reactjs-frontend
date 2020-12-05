import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  logout,
  selectLoginState,
} from './loginSlice';
import styles from './Login.module.css';
import LoginRequest from './LoginRequest'

export function Login() {
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();
  const [login, logout] = useState(false);

  return (
    <div>
      <div className={styles.row}>
        <LoginRequest username = '3' password = '3' />
        <button
          className={styles.button}
          aria-label="Login"
          onClick={() => 
            {
              dispatch(login());
              
            }
          }
          >
          +
        </button>
        <span className={styles.value}>{loginState}</span>
        <button
          className={styles.button}
          aria-label="Logout"
          onClick={() => dispatch(logout())}
          >
          -
        </button>
      </div>

    </div>
  );
}
