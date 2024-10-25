import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((updatedUser) => {
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    return axios.put(`https://fakestoreapi.com/users/${userId}`, updatedUser);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      alert('User updated successfully');
    },
    onError: () => {
      alert('Error updating user');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div>
      <h2>Update User Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserUpdate;
