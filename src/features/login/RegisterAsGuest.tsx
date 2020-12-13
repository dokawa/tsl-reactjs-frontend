import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import form_styles from './Form.module.css';
import styles from './Register.module.css';
import { parseErrorMessage, renderErrorMessage } from './parseErrorMessage'

export const RegisterAsGuest: React.FC = () => {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState([''])


  const registerRequest = () => { axios.post(process.env.REACT_APP_BACKEND_HOST + "/register-as-guest/", params) 
  .then((res) => { 
      history.push('/login');
  }) 
  .catch((error) => {
    if (error.response === undefined) {
      setErrorMessage([ 'Request failed: check your internet connection and try again' ])
    }
    else {
      setErrorMessage(parseErrorMessage(error.response.data))
    }
  }) }

  let params = {
    username: username,
    email: email,
    password: password,
  }

  return (
    <div className={styles.register_container}>
      <div className={styles.row}>
      
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="text"
          id="e_mail"
          name="e_mail"
          placeholder="e-mail"
          onChange={e => setEmail(e.target.value)}
        />


        <input
          type="text"
          id="password"
          name="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className={form_styles.button} onClick= { registerRequest }>Register as guest</button>
        <div className={form_styles.error_text}>{ renderErrorMessage(errorMessage) }</div>
      </div>
    </div>
  );
}
