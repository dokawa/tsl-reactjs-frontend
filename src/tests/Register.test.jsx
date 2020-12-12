import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { Register } from '../features/login/Register';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import postsReducer from '../features/posts/postsSlice';
import userEvent from '@testing-library/user-event';

jest.mock("axios");

let store = null;

beforeEach(() => {
  store = configureStore({
    reducer: {
      posts: postsReducer
    },
  });
  render(
    <Provider store={store}> // Set context
      <Register />
    </Provider>
  )
});

describe('App', () => {

  test('render register button', async () => {
    await axios.post.mockResolvedValue({})

    await userEvent.type(screen.getByPlaceholderText('username'), 'john.doe')
    await userEvent.type(screen.getByPlaceholderText('first name'), 'John')
    await userEvent.type(screen.getByPlaceholderText('last name'), 'Doe')
    await userEvent.type(screen.getByPlaceholderText('e-mail'), 'john.doe@email.com')
    await userEvent.type(screen.getByPlaceholderText('password'), 'password')

    await userEvent.click(screen.getByText('Sign up'))

    const promise = Promise.resolve();
    await act(() => promise);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/register/", {
      username: 'john.doe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@email.com',
      password: 'password',
    });
  });

});
