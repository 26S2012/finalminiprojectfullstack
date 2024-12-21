// UserLogin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store'; // Assuming store is properly configured
import UserLogin from './UserLogin';
import { login } from '../Features/UserSlice'; // Assuming the login action exists

jest.mock('../Features/UserSlice'); // Mocking the login action

describe('UserLogin Component', () => {
  it('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the form elements are present
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted with empty fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );

    // Submit the form without entering values
    fireEvent.click(screen.getByText('Login'));

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('dispatches login action on successful form submission', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );

    // Simulate form input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Login'));

    // Check if login action was dispatched
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('redirects to /Category on successful login', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );

    // Simulate successful login
    store.dispatch({
      type: 'user/login',
      payload: { email: 'test@example.com', password: 'password123' },
    });

    // Check if the user was redirected to /Category
    await waitFor(() => {
      expect(window.location.pathname).toBe('/Catogry');
    });
  });

  it('shows error alert on failed login', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserLogin />
        </BrowserRouter>
      </Provider>
    );

    // Simulate failed login
    store.dispatch({
      type: 'user/loginError',
      payload: 'Invalid credentials',
    });

    // Check if error alert is displayed
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Email or Password is incorrect!');
    });
  });
});
1