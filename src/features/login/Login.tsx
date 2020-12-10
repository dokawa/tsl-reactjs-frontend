import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import './Login.module.css';
import { setToken } from './TokenStorage';
import axios from "axios";
import { parseErrorMessage, renderErrorMessage } from './parseErrorMessage'

export function Login() {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState([''])

  const gotoRegisterPage = () => {
    history.push('/register');
  }

  const gotoRegisterAsGuestPage = () => {
    history.push('/register-as-guest');
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
      })
      .catch((error) => {  
        if (error.response == undefined) {
          setErrorMessage([ 'Request failed: check your internet connection and try again' ])
        }
        else {
          setErrorMessage(parseErrorMessage(error.response.data))
        }
      })
  }

  return (
    <div>
      <div className={styles.row}>

        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="login-button" type="button" onClick={sendRequest}>Login</button>
        <button className="register-button" type="button" onClick={gotoRegisterPage}>Sign up</button>
        <button className="register-guest-button" type="button" onClick={gotoRegisterAsGuestPage}>Enter as guest</button>
        <div className="error-text">{ renderErrorMessage(errorMessage) }</div>

      </div>

    </div>
  );
}
