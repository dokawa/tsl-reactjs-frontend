import React from 'react';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { Login } from './features/login/Login';
import { Logout } from './features/login/Logout';
import { Route } from "react-router";
import { Navbar } from './navbar/Navbar';
import { Register } from './features/login/Register';
import { RegisterAsGuest } from './features/login/RegisterAsGuest';
import { Guard } from './features/login/Guard';

export const RouterManager:React.FC = () => {
    // const loginState = useSelector(selectLoginState);

    return(
          <div>        
            <Navbar/>    
            <Guard>
              <Route exact path="/" render={() => (
                  <React.Fragment>
                    <Logout/>
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
            <Route exact path="/register" render={() => (
              <React.Fragment>
                <Register/>
              </React.Fragment>
            )}
            />
            <Route exact path="/register-as-guest" render={() => (
              <React.Fragment>
                <RegisterAsGuest/>
              </React.Fragment>
            )}
            />
          </div>
    )
}