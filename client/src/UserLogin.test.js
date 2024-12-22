import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserLogin from './UserLogin';
import { Provider } from 'react-redux';
import { store } from '../store';  // Assuming your Redux store is defined

test('should display validation errors on invalid form submission', async () => {
  render(
    <Provider store={store}>
      <UserLogin />
    </Provider>
  );

  // Test for invalid email format
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });

  // Test for missing password
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: '' } });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() => {
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });
});
