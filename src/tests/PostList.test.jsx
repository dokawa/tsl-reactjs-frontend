import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { PostsList } from '../features/posts/PostsList';
import { clearPosts, addPost, addPosts, selectPosts } from '../features/posts/postsSlice';
import {render, screen} from '@testing-library/react';
import { actions, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import postsReducer from '../features/posts/postsSlice';

jest.mock("axios"); 

let store = null;

beforeEach(() => {
  store = configureStore({ reducer: {
      posts: postsReducer
    },
  });
});

describe('App', () => {

  test('render post list requet', async () => {
    const fakeResponse = {
      data: { 
        results:
          [{ id:"1", owner: "test1", message: "Hi" }, { id:"2", owner: "test2", message: "Hello" } ]
      }
    }
    
    await axios.get.mockResolvedValue(fakeResponse)
    
    render(
      <Provider store={store}> // Set context
        <PostsList/>
      </Provider>
    )

    const promise = Promise.resolve();
    await act(() => promise);

    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  
});
