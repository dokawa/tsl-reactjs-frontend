import React from 'react';

import { useSelector } from 'react-redux';

import { Redirect } from "react-router";
import {
  selectLoginState,
} from './loginSlice';

export const Guard:React.FC = (props) => {
    const loginState = useSelector(selectLoginState);

    if (loginState == false) {
        return (<Redirect to="/login"/>)
    }

    return (<> { props.children }</>);
}