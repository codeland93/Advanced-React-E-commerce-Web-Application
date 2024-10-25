import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  const mutation = useMutation((loginData) => axios.post('https://fakestoreapi.com/auth/login', loginData), {
    onSuccess: (data) => {
      sessionStorage.setItem('user', JSON.stringify(data.data));
      alert('Login successful!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} value={credentials.username} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={credentials.password} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
