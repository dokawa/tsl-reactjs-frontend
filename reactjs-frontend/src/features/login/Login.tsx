import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { setToken } from './TokenStorage';
import axios from "axios";

export function Login() {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const gotoRegisterPage = () => {
    history.push('/register');
  }

  const gotoRegisterAsGuestPage = () => {
    history.push('/register-as-guest');
  }


  type Credentials = {
    username: String;
    password: String;
  }

  let params = {
    username: username,
    password: password
  }

  const sendRequest = () => {
    axios.post("http://localhost:8000/token/", params)
    .then((res) => {
      let data = res.data;
      setToken(data['token']);
      history.push('/')
      console.log(data);
    })
    .catch((err) => { })
  }

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

        {/* <LoginRequest username= {username} password={password}/> */}
        <button type="button" onClick={sendRequest}>Login</button>
        <button type="button" onClick={gotoRegisterPage}>Register</button>
        <button type="button" onClick={gotoRegisterAsGuestPage}>Register as guest</button>

        {/* <span className={styles.value}>{loginState}</span> */}
      </div>

    </div>
  );
}
