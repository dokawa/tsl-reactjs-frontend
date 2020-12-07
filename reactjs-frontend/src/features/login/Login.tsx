import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import {
  login,
  logout,
  selectLoginState,
} from './loginSlice';
import styles from './Login.module.css';
import { LoginRequest } from './loginRequest'

export function Login() {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className={styles.row}>
      
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="text"
          id="postTitle"
          name="postTitle"
          onChange={e => setPassword(e.target.value)}
        />

        <LoginRequest username= {username} password={password}/>

        {/* <span className={styles.value}>{loginState}</span> */}
      </div>
        
    </div>
  );
}
