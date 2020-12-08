import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import { setToken } from './TokenStorage';
import axios from "axios";

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
    })
    .catch((error) => { 
      console.log('hue');
      if (error.response) {
        let error_message:string[] = [];
        // console.log(error.response.data)

        Object.keys(error.response.data).map((key) => {
          let message;
          let field:string = key;
          if (field == 'non_field_errors') 
            message = error.response.data[key][0];
          else {
            // let message_value = entry[1].slice(0, -1)[0];
            // let message_value = ;
            message = capitalize(field) + ": " + uncapitalize(error.response.data[key][0]).slice(0, -1);
          }
          error_message.push(message);
        })
        setErrorMessage(error_message)
      }
    })
  }

  const capitalize = (text: string) => {
    return  text.charAt(0).toUpperCase() + text.slice(1);
  }

  const uncapitalize = (text:string) => {
    return  text.charAt(0).toLowerCase() + text.slice(1);
  }

  const renderErrorMessage = () => {
    return (errorMessage.map ((error, i) => 
        <div key={i}>{ error }</div>
    )
    )
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

        <button type="button" onClick={sendRequest}>Login</button>
        <button type="button" onClick={gotoRegisterPage}>Sign up</button>
        <button type="button" onClick={gotoRegisterAsGuestPage}>Enter as guest</button>
        <p>{ renderErrorMessage() }</p>

      </div>

    </div>
  );
}
