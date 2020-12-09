import React from 'react';

import { unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { Login } from './features/login/Login';
import { Register } from './features/login/Register';
import { act } from "react-dom/test-utils";
import * as axios from "axios";
import {render, fireEvent, cleanup, screen} from '@testing-library/react';

// test('renders learn react link', () => {
//   const { getByText } = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   expect(getByText(/learn/i)).toBeInTheDocument();
// });
jest.mock("axios"); 

// describe('App', () => {
//   test('renders App component', () => {
//     render(<Login />);
 

//   });
// });


it("renders with or without a name", () => {
  const { getByText } = render(
    <Login/>
  );
  expect(getByText("Login")).toBeInTheDocument();
});

describe('App', () => {
 
  // test('fetches stories from an API and fails', async () => {
  //   axios.post.
 
  //   render(<App />);
 
  //   await userEvent.click(screen.getByRole('button'));
 
  //   const message = await screen.findByText(/Something went wrong/);
 
  //   expect(message).toBeInTheDocument();
  // });
// });

  test('login error message', async () => {
    render(<Login />);

    expect(screen.getByText('Login')).toBeInTheDocument();

    const fakeResponse = {
      response: { 
        data: {
          username:	[ "This field may not be blank." ],
          password:	[ "This field may not be blank." ]
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

  test('register error message', async () => {
    render(<Register />);

    const fakeResponse = {
      response: { 
        data: {
          username:	[ "This field may not be blank." ],
          email:	[ "This field may not be blank." ],
          password:	[ "This field may not be blank." ]
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
  });

  test('register as guest error message', async () => {
    render(<Register />);

    const fakeResponse = {
      response: { 
        data: {
          username:	[ "This field may not be blank." ],
          email:	[ "This field may not be blank." ],
          password:	[ "This field may not be blank." ]
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
  });

  
  


// it("renders user data", () => {
//   const fakeResponse = {
//     username:	[ "This field may not be blank." ],
//     password:	[ "This field may not be blank." ]
//   };

//   axios.post.mockImplementation(() => Promise.resolve({ fakeResponse }));
//   const button = container.querySelector(".login-button");
//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });



  // axios.post.mockImplementation(() => Promise.resolve({ fakeResponse }));

  // // Usar a versão assíncrona de act para aplicar Promises resolvidas
  // await act(async () => {
  //   render(<Login />, container);
  // });

  // const button = document.querySelector(".login-button");

  // act(() => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });

  // expect(document.querySelector(".error-text").textContent).toBe([username]);
  // expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  // expect(container.textContent).toContain(fakeUser.address);

  // remover o mock para garantir que os testes estão completamente isolados  


});