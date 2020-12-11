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
  
  test('add post to redux', async () => {
    const store = configureStore({ reducer: addPost });
    const message = "Hello"
    const expectedAction = {
      type: "posts/addPost",
      payload: "Hello",
    }

    expect(addPost(message)).toEqual(expectedAction)

    // Avoid 'undefined' axios
    const fakeResponse = { data: { token: "aaaaaaaaaaa"} }  // Avoid wrong object parse
    await axios.post.mockResolvedValue(fakeResponse)

    render(
      <Provider store={store}> // Set context
        <AddPostForm/>
      </Provider>
    )
  });

  test('post request', async () => {
    const store = configureStore({ reducer: addPost });

    const fakeResponse = { 
      data: { 
        results:
          [ { id:"2", owner: "test2", message: "Hello" } ]
      } 
    } 
    await axios.post.mockResolvedValue(fakeResponse)

    render(
      <Provider store={store}> // Set context
        <AddPostForm/>
      </Provider>
    )

    await userEvent.type(screen.getByRole('textbox'), 'Hello')
    await userEvent.click(screen.getByText('Post'))

    const promise = Promise.resolve({ });
    await act(() => promise);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/", { message: 'Hello'}, { headers: { 'Authorization': 'Token null' }});

  });
});
