import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { AddPostForm } from '../features/posts/AddPostForm';
import { clearPosts, addPost, addPosts, selectPosts } from '../features/posts/postsSlice';
import {render, fireEvent, screen} from '@testing-library/react';
import { actions, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';

jest.mock("axios"); 

let container = null;
let store = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  store = configureStore({ reducer: addPost });
  render(
    <Provider store={store}> // Set context
      <AddPostForm/>
    </Provider>
  )
});

describe('App', () => {

  test('render post button', () => {
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
  
  test('add post to redux', async () => {
    const message = "Hello"
    const expectedAction = {
      type: "posts/addPost",
      payload: "Hello",
    }

    expect(addPost(message)).toEqual(expectedAction)
  });

  test('post request', async () => {
    const fakeResponse = { 
      data: { 
        results:
          [ { id:"2", owner: "test2", message: "Hello" } ]
      } 
    } 
    await axios.post.mockResolvedValue(fakeResponse)

    await userEvent.type(screen.getByRole('textbox'), 'Hello')
    await userEvent.click(screen.getByText('Post'))

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/", { message: 'Hello'}, { headers: { 'Authorization': 'Token null' }});

  });
});
