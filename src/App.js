import React, { useState } from 'react';
import ProductList from './components/ProductList'; 
import ProductDetail from './components/ProductDetail'; 
import Cart from './components/Cart'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <h1>Product Store</h1>
      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? 'Back to Products' : 'View Cart'}
      </button>
      {showCart ? (
        <Cart />
      ) : (
        <>
          <ProductList onProductSelect={handleProductSelect} />
          {selectedProduct && <ProductDetail product={selectedProduct} />} {/* Only render if a product is selected */}
        </>
      )}
    </div>
  );
};

export default App;
