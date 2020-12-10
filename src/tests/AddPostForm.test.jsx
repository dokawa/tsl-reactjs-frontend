import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { AddPostForm } from '../features/posts/AddPostForm';
import { clearPosts, addPost, addPosts, selectPosts } from '../features/posts/postsSlice';
import {render, fireEvent, screen} from '@testing-library/react';
import { actions, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';

jest.mock("axios"); 

describe('App', () => {

  test('render post button', () => {
    const store = configureStore({ reducer: addPost });

    render(
      <Provider store={store}> // Set context
        <AddPostForm/>
      </Provider>
    )

    expect(screen.getByText('Post')).toBeInTheDocument();
  });
  
  test('add post action', () => {
    const message = "Hello"
    const expectedAction = {
      type: "posts/addPost",
      payload: "Hello",
    }

    expect(addPost(message)).toEqual(expectedAction)

    // const expectedState = {
      
    // }

    // expect(useSelector(selectPosts)).toEqual(expectedState)

  });
});
