import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { PostsList } from '../features/posts/PostsList';
import { clearPosts, addPost, addPosts, selectPosts } from '../features/posts/postsSlice';
import {render, fireEvent, screen} from '@testing-library/react';
import { actions, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import { postsSlice } from '../features/posts/postsSlice';
import postsReducer from '../features/posts/postsSlice';

jest.mock("axios"); 

describe('App', () => {

  test('render post button', async () => {
    const fakeResponse = {
      data: { 
        results:
          [{ id:"1", owner: "test1", message: "Hi" }, { id:"2", owner: "test2", message: "Hello" } ]
      }
    }
    
    await axios.get.mockResolvedValue(fakeResponse)

    const store = configureStore({ 
      reducer: {
        posts: postsReducer
      },
    });

    
    render(
      <Provider store={store}> // Set context
        <PostsList/>
      </Provider>
    )

    // await axios.get.mockResolvedValue(fakeResponse)


    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  
});
