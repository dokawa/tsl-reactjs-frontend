import React from 'react';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { render, fireEvent, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Login } from '../features/login/Login';
import postsReducer from '../features/posts/postsSlice';
import userEvent from '@testing-library/user-event';


jest.mock("axios");
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

let store = null;

beforeEach(() => {
  store = configureStore({ reducer: postsReducer });
  render(
    <Provider store={store}> // Set context
        <Login />
    </Provider>
  )
});

afterEach(() => {
});

describe('App', () => {

  test('test login', async () => {
    // Avoid 'undefined' axios
    const fakeResponse = { data: { token: "aaaaaaaaaaa" } }  // Avoid wrong object parse
    await axios.post.mockResolvedValue(fakeResponse)

    await userEvent.type(screen.getByPlaceholderText('username'), 'username')
    await userEvent.type(screen.getByPlaceholderText('password'), 'password')
    fireEvent.click(screen.getByText("Login"))

    const promise = Promise.resolve({});
    await act(() => promise);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/token/", { username: "username", password: "password" });

  });

});
