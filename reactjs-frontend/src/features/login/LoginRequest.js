import React, { Component, useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import axios from "axios";
import {
  login,
  logout,
  selectToken,
  setToken,
} from './loginSlice';


export function LoginRequest(props) {

    let params = {
        username: props.username,
        password: props.password
    }

    const dispatch = useDispatch();

    const sendRequest = () => { axios.post("http://localhost:8000/token/", params) 
        .then((res) => { 
            let data = res.data;
            dispatch(setToken(data['token']));
            console.log(data);
        }) 
        .catch((err) => {}) }



    return (
      <input type="button" onClick={sendRequest} />
    )
   
}
