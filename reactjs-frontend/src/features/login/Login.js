import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login,
  logout,
  selectLoginState,
} from './loginSlice';
import styles from './Login.module.css';
import { LoginRequest } from './loginRequest'

export function Login() {
  const loginState = useSelector(selectLoginState);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
      
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value="password"
        />

        <LoginRequest username='3' password='3'/>
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
