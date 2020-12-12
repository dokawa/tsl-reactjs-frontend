import React from 'react';

import { getToken } from './TokenStorage';
import { Redirect } from "react-router";

export const Guard: React.FC = (props) => {

  if (getToken() === '' || getToken() === null) {
    return (<Redirect to="/login" />)
  }

  return (<> { props.children}</>);
}s