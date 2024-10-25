import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice'; // Adjust path as needed
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Function to handle item removal
  const handleRemoveItem = (id, title) => {
    dispatch(removeFromCart(id));
    alert(`${title} removed from cart.`);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '10px' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id, item.title)}
                style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '15px' }}>
            <p><strong>Total Quantity:</strong> {totalQuantity}</p>
            <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            style={{ padding: '10px 15px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', marginTop: '15px' }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
