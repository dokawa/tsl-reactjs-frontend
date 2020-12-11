import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import styles from './Login.module.css';
import { parseErrorMessage, renderErrorMessage } from './parseErrorMessage'

export function RegisterAsGuest() {

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState([''])


  const registerRequest = () => { axios.post("http://localhost:8000/enter-as-guest/", params) 
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

        <button className={styles.button} onClick= { registerRequest }>Register as guest</button>
        <div className={styles.error_text}>{ renderErrorMessage(errorMessage) }</div>

      </div>
        
    </div>
  );
}
