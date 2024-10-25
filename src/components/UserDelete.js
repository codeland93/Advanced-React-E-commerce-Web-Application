import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const UserDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => {
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    return axios.delete(`https://fakestoreapi.com/users/${userId}`);
  }, {
    onSuccess: () => {
      // Clear session storage after account deletion
      sessionStorage.removeItem('user');
      queryClient.invalidateQueries('user');
      alert('User deleted successfully');
    },
    onError: () => {
      alert('Error deleting user');
    }
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <button onClick={handleDelete}>Delete My Account</button>
    </div>
  );
};

export default UserDelete;
