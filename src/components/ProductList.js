import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'; 
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';

const ProductList = ({ onProductSelect }) => {
  const dispatch = useDispatch();
  
  // Use React Query to fetch products
  const { data, error, isLoading } = useQuery('products', () =>
    axios.get('https://fakestoreapi.com/products')
  );

  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  // Filter products based on the search term
  const filteredProducts = data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div>
      <h2>Product Catalog</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }} onClick={() => onProductSelect(product)}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
