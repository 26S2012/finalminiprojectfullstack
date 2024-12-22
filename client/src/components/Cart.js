import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, removeFromCart, increaseQuantity, decreaseQuantity } from '../Features/CartSlice';
import { placeOrder } from '../Features/OrderSlice'; // Assuming you have orderSlice for managing orders

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchCartItems(user.email)); // Fetch cart items based on the logged-in user's email
    } else {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  }, [dispatch, user, navigate]);

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty. Please add some products.");
      return;
    }
  
    // Redirect to the address page
    navigate("/Address"); // Directs the user to the address page to select/add an address
  };
  

  // const handleCheckout = () => {
  //   if (items.length === 0) {
  //     alert("Your cart is empty. Please add some products.");
  //     return;
  //   }

  //   const orderData = {
  //     userEmail: user.email,
  //     products: items.map(item => ({
  //       productId: item.productId,
  //       productName: item.productName,
  //       quantity: item.quantity,
  //       price: item.price,
  //     })),
  //     totalAmount: calculateTotal(),
  //   };

  //   // Dispatch action to place the order
  //   dispatch(placeOrder(orderData));

  //   // Navigate to the checkout page or show confirmation
  //   navigate("/checkout"); // Assuming you have a checkout page to complete the purchase
  // };

  const handleRemoveFromCart = (productId) => {
    // Dispatch action to remove product from the cart
    dispatch(removeFromCart({ email: user.email, productId }));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity({ email: user.email, productId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity({ email: user.email, productId }));
  };

   const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container">
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div>
          
          <table className="table table-bordered" style={{ marginTop: "20px" }}>
            <thead className="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Price (OMR)</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleDecreaseQuantity(item.productId)}
                      style={{ marginRight: '10px' }}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-success"
                      onClick={() => handleIncreaseQuantity(item.productId)}
                      style={{ marginLeft: '10px' }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col text-right">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="total">
        <h4>Total: OMR {calculateTotal()}</h4>
      </div>
    </div>
  );
};
export { calculateTotal };
export default Cart;
