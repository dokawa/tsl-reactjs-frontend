import React from 'react';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { Login } from './features/login/Login';
import { FormPanel } from './features/login/FormPanel';
import { Route } from "react-router";
import { Navbar } from './features/navbar/Navbar';
import { Register } from './features/login/Register';
import { RegisterAsGuest } from './features/login/RegisterAsGuest';
import { Guard } from './features/login/Guard';

export const RouterManager: React.FC = () => {

  return (
    <div>
      <Guard>
        <Route exact path="/" render={() => (
          <React.Fragment>
            <Navbar />
            <AddPostForm />
            <PostsList />
          </React.Fragment>
        )}
        />
      </Guard>

      <Route exact path="/login" render={() => (
        <React.Fragment>
          <FormPanel>
            <Login />
          </FormPanel>
        </React.Fragment>
      )}
      />
      <Route exact path="/register" render={() => (
        <React.Fragment>
          <FormPanel>
            <Register/>
          </FormPanel>
        </React.Fragment>
      )}
      />
      <Route exact path="/register-as-guest" render={() => (
        <React.Fragment>
          <FormPanel>
            <RegisterAsGuest/>
          </FormPanel>
        </React.Fragment>
      )}
      />
    </div>
  )
}