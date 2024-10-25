import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const mutation = useMutation((user) => {
    return axios.post('https://fakestoreapi.com/auth/login', user);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(credentials, {
      onSuccess: (data) => {
        // Store user data in session storage
        sessionStorage.setItem('user', JSON.stringify(data.data));
        alert('Login Successful!');
      },
      onError: (error) => {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials.');
      },
    });
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
