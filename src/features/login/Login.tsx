import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import form_styles from './Form.module.css';
import { setToken } from './TokenStorage';
import axios from "axios";
import { parseErrorMessage, renderErrorMessage } from './parseErrorMessage'

export const Login: React.FC = () => {

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

  const gotoLoginPage = () => {
    history.push('/');
  }

  let params = {
    username: username,
    password: password
  }

  const sendRequest = () => {
    console.log(process.cwd());
    axios.post(process.env.REACT_APP_BACKEND_HOST + "/token/", params)
      .then((res) => {
        let data = res.data;
        setToken(data['token']);
        gotoLoginPage();
      })
      .catch((error) => {
        console.log(error)
        if (error.response === undefined) {
          setErrorMessage(['Request failed: check your internet connection and try again'])
        }
        else {
          setErrorMessage(parseErrorMessage(error.response.data))
        }
      })
  }

  return (
    <div className={styles.login_container}>
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

        <button className={form_styles.button} onClick={sendRequest}>Login</button>
        <button className={form_styles.button} onClick={gotoRegisterPage}>Sign up</button>
        <button className={form_styles.button} onClick={gotoRegisterAsGuestPage}>Enter as guest</button>
        <div className={form_styles.error_text}>{renderErrorMessage(errorMessage)}</div>

      </div>

    </div>
  );
}
