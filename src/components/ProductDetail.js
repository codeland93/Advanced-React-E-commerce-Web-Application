import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) return <p>Select a product to view details.</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
