import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const mutation = useMutation((newUser) => axios.post('https://fakestoreapi.com/users', newUser));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => {
        alert('User registered successfully!');
      },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
      <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
