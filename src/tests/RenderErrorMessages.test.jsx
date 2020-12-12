import React from 'react';
import { Login } from '../features/login/Login';
import { Register } from '../features/login/Register';
import { RegisterAsGuest } from '../features/login/RegisterAsGuest';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import { render, fireEvent, screen } from '@testing-library/react';

jest.mock("axios");

describe('App', () => {
  test('render login error message', async () => {
    render(<Login />);

    expect(screen.getByText('Login')).toBeInTheDocument();

    const fakeResponse = {
      response: {
        data: {
          username: ["This field may not be blank."],
          password: ["This field may not be blank."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Login'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Username: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Password: this field may not be blank')).toBeInTheDocument();
  });

  test('render register error message', async () => {
    render(<Register />);

    const fakeResponse = {
      response: {
        data: {
          username: ["This field may not be blank."],
          email: ["This field may not be blank."],
          password: ["This field may not be blank."],
          first_name: ["This field may not be blank."],
          last_name: ["This field may not be blank."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Sign up'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Username: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Email: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Password: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('First name: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Last name: this field may not be blank')).toBeInTheDocument();
  });

  test('render register as guest error message', async () => {
    render(<RegisterAsGuest />);

    const fakeResponse = {
      response: {
        data: {
          username: ["This field may not be blank."],
          email: ["This field may not be blank."],
          password: ["This field may not be blank."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Register as guest'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Username: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Email: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Password: this field may not be blank')).toBeInTheDocument();
  });

  test('render wrong credentials message', async () => {
    render(<Login />);

    const fakeResponse = {
      response: {
        data: {
          non_field_errors: ["Unable to log in with provided credentials."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Login'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Unable to log in with provided credentials')).toBeInTheDocument();
  });

  test('render register as guest error message', async () => {
    render(<RegisterAsGuest />);

    const fakeResponse = {
      response: {
        data: {
          username: ["This field may not be blank."],
          email: ["This field may not be blank."],
          password: ["This field may not be blank."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Register as guest'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Username: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Email: this field may not be blank')).toBeInTheDocument();
    expect(screen.getByText('Password: this field may not be blank')).toBeInTheDocument();
  });

  test('render invalid email address message', async () => {
    render(<RegisterAsGuest />);

    const fakeResponse = {
      response: {
        data: {
          email: ["Enter a valid email address."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Register as guest'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Email: enter a valid email address')).toBeInTheDocument();
  });

  test(`render username already exist message`, async () => {
    render(<Register />);

    const fakeResponse = {
      response: {
        data: {
          username: ["A user with that username already exists."]
        }
      }
    }

    await axios.post.mockRejectedValue(fakeResponse)
    fireEvent.click(screen.getByText('Sign up'))

    const promise = Promise.resolve({ fakeResponse });
    await act(() => promise);

    expect(screen.getByText('Username: a user with that username already exists')).toBeInTheDocument();
  });

});




