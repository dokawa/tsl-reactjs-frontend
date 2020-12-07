import React from 'react';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { useSelector } from 'react-redux';
import { Login } from './features/login/Login';
import { Route } from "react-router";
import {
  selectLoginState,
} from './features/login/loginSlice';
import { Guard } from './features/login/Guard';

export const RouterManager:React.FC = () => {
    const loginState = useSelector(selectLoginState);

    return(
          <div>            
            <Guard>
              <Route exact path="/" render={() => (
                  <React.Fragment>
                    <AddPostForm/>
                    <PostsList/>
                  </React.Fragment>
                )}
                />
            </Guard>
            <Route exact path="/login" render={() => (
              <React.Fragment>
                <Login/>
              </React.Fragment>
            )}
            />
          </div>
    )
}