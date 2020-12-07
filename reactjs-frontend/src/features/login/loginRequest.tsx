import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {
  login,
  logout,
  selectToken,
  setToken,
} from './loginSlice';

type Credentials = {
    username: String; 
    password: String;
}


export function LoginRequest(credentials: Credentials) {
    const history = useHistory()

    let params = {
        username: credentials.username,
        password: credentials.password
    }

    const dispatch = useDispatch();

    const sendRequest = () => { axios.post("http://localhost:8000/token/", params) 
        .then((res) => { 
            let data = res.data;
            dispatch(setToken(data['token']));
            dispatch(login())
            history.push('/')
            console.log(data);
        }) 
        .catch((err) => {}) }

    return (
      <input type="button" onClick={sendRequest} />
    )
   
}
